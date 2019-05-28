//用法 new compile(el,vm) el是我要遍历的元素 vm是vue的实例 

class Compile {
    constructor(el, vm) { //el有可能是一个选择器也有可能是一个字符串也有可能是dom 今天我们先只考虑选择器
        //遍历宿主对象
        this.$el = document.querySelector(el);
        this.$vm = vm; //保存一个成员变量方便一会儿使用

        if (this.$el) {
            //转换内部内容为代码片段
            this.$fragment = this.node2Fragment(this.$el);

            //执行编译
            this.compile(this.$fragment)

            //将编译的结果追加到$el宿主
            this.$el.appendChild(this.$fragment);
        }
    }

    //将宿主元素中的代码片段拿出来遍历 这样做比较高效 这是一个性能上的考虑
    node2Fragment(el) {
        const frag = document.createDocumentFragment(); //创建一个代码片段
        //将el中所有的子元素都搬家至frag中
        let child;
        while (child = el.firstChild) {  //appendchild会将之前el中所有的元素全部搬走
            frag.appendChild(child);
        }
        return frag;
    }

    //编译过程
    compile(el) {
        const childNodes = el.childNodes;
        Array.from(childNodes).forEach(element => { //遍历片段来检查类型做对应的操作
            //类型判断
            if (this.isElement(element)) {
                //元素
                //console.log('编译元素' + element.nodeName)
                //查找开头元素 @ K-
                //拿出所有的节点属性 
                const nodeAttrs = element.attributes;
                Array.from(nodeAttrs).forEach(attr => {
                    const attrName = attr.name; //属性名
                    const exp = attr.value; //属性值
                    if (this.isDirective(attrName)) { //当attrName是一个指令的时候
                        //k-text
                        const dir = attrName.substring(2);
                        //执行指令
                        this[dir] && this[dir](element, this.$vm, exp)
                    }
                    if (this.isEvent(attrName)) {
                        let dir = attrName.substring(1); // @click
                        this.eventHandler(element, this.$vm, exp, dir)
                    }

                })

            } else if (this.isInterpolation(element)) {
                //插值
                //console.log('编译插值'  + element.textContent) 
                this.compileText(element)
            }

            //递归子节点
            if (element.childNodes && element.childNodes.length > 0) {
                this.compile(element)
            }
        });
    }

    //更新函数
    update(node, vm, exp, dir) {
        const updaterFn = this[dir + 'Updater']; //这时候我们希望当修改text的时候调用的textUpdater方法 修改html的时候调用的是htmlUpdater方法。。。

        //这是初始化 是做第一次 后面我们还需要做依赖收集的工作
        updaterFn && updaterFn(node, vm[exp])

        //依赖收集
        new Watcher(vm, exp, function (value) {
            updaterFn && updaterFn(node, value)
        })
    }

    compileText(el) {
        //console.log(RegExp.$1)
        //el.textContent = this.$vm.$data[RegExp.$1]
        this.update(el, this.$vm, RegExp.$1, 'text');
    }

    // 事件处理
    eventHandler(node, vm, exp, dir) {
        //@click='xxx' exp就是xxx
        let fn = vm.$options.methods && vm.$options.methods[exp]
        if (dir && fn) {
            node.addEventListener(dir, fn.bind(vm), false)
        }
    }

    //双绑
    model(node, vm, exp) {
        //指定input的value属性
        this.update(node, vm, exp, 'model');

        //视图对模型的影响
        let val = vm.exp;
        node.addEventListener('input', (e) => {
            let newValue = e.target.value
            vm[exp] = newValue
            val = newValue
        })
    }

    //它与textUpdater不同的是它绑定的是input的value text是innerhtml
    modelUpdater(node, value) {
        node.value = value
    }

    html(node, vm, exp) {
        this.update(node, vm, exp, 'html')
    }

    htmlUpdater(node, value) {
        node.innerHTML = value
    }

    text(node, vm, exp) {
        this.update(node, vm, exp, 'text');
    }

    textUpdater(node, value) {
        node.textContent = value;
    }

    isElement(el) {
        return el.nodeType === 1;
    }

    isDirective(el) {
        return el.indexOf('k-') == 0;
    }

    isEvent(el) {
        return el.indexOf('@') == 0;
    }

    //插值文本
    isInterpolation(el) {
        return el.nodeType === 3 && /\{\{(.*)\}\}/.test(el.textContent)
    }

}