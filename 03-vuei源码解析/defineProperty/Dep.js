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

class Watcher {
    constructor() {
        Dep.target = this;
    }
    updata() {
        console.log('更新了')
    }
}