//new KVue({...})
class KVue {
    constructor(options) {
        this.$options = options; //这时候我们先做一个缓存 因为别的地方还会用到

        //数据响应化
        this.$data = options.data;
        this.observe(this.$data);

        // new Watcher();
        // this.$data.test;
        // new Watcher();
        // this.$data.foo.bar;

        new Compile(options.el, this)

        if (options.created) {
            options.created.call(this);
        }
    }

    observe(value) {
        if (!value && typeof value !== 'object') {
            return;
        }
        //遍历该对象
        Object.keys(value).forEach(key => {
            this.defineReactive(value, key, value[key]);

            //代理data中的属性到vue实例中
            this.proxyData(key)
        })
    }

    //定义数据响应化
    defineReactive(obj, key, val) { //指定的obj就是要挂载的对象

        if (typeof val == 'object') {
            this.observe(val) //递归解决数据嵌套问题
        }

        const dep = new Dep(); //首先在这里定义一dep 将来在某一个时候把这些依赖收集起来放在dep中 通过这个dep去通知所有的Watcher

        Object.defineProperty(obj, key, {
            get() {
                Dep.target && dep.addDep(Dep.target)
                return val;
            },
            set(newVal) {
                if (newVal === val) {
                    return;
                }
                val = newVal;
                // console.log(`${key}属性更新了：${val}更新了`)
                dep.notify()
            }
        })
    }

    proxyData(key) {
        Object.defineProperty(this, key, {
            get() {
                return this.$data[key]
            },
            set(newVal) {
                this.$data[key] = newVal;
            }
        })
    }
}

//Dep 用来管理watcher
class Dep {
    constructor() {
        //这里存放的若干依赖 这是依赖于属性的
        this.deps = [];
    }

    addDep(dep) {
        this.deps.push(dep)
    }

    notify() {
        this.deps.forEach(dep => { dep.updata() })
    }
}

//Watcher 就是用来做具体更新的函数
class Watcher {
    constructor(vm, key, cb) {
        this.vm = vm;
        this.key = key;
        this.cb = cb;
        //当将前的wather实例指定到Dep静态属性target 目前只是用来与dep通信
        Dep.target = this;
        this.vm[this.key]; //触发getter 添加依赖
        Dep.target = null;
    }
    updata() {
        // console.log('更新了')
        this.cb.call(this.vm, this.vm[this.key])
    }
}
