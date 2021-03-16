const {
    getList,
    getDetail,
    newBlog,
    updateBlog,
    delBlog
} = require('../controller/blog')
const { SuccessModel, ErrorModel } = require('../model/resModel')

const  handleBlogRouter = (req, res) => {
    const method = req.method //GET POST
    const id = req.query.id || ''

    //获取博客列表
    if(method === 'GET' && req.path === '/api/blog/list'){
       const author = req.query.author || '' 
       const keyword = req.query.keyword || ''
       const result = getList(author, keyword)
       return result.then(listData=>{
           return new SuccessModel(listData)
       })
    //    const listData = getList(author, keyword)
    //    return new SuccessModel(listData)
    
    }

    //获取博客内容详情
    if(method === 'GET' && req.path === '/api/blog/detail'){
        // const data = getDetail(id)
        // return new SuccessModel(data)
        const result = getDetail(id)
        return result.then(data => {
            return new SuccessModel(data)
        })
    }

    //新增博客
    if(method === 'POST' && req.path === '/api/blog/new'){
        // const data = newBlog(req.body)
        // return new SuccessModel(data)
        req.body.author = 'zhangsan' //假数据在开发登录时再改成真实数据
        const result = newBlog(req.body)
        return result.then(data => {
            return new SuccessModel(data)
        })
    }

    //更新博客
    if(method === 'POST' && req.path === '/api/blog/update'){
        const result = updateBlog(id, req.body)
        return result.then(val => {
            if(val){
                return new SuccessModel()
            }else {
                return new ErrorModel('更新博客失败')
            }
        })
        
    }

    //删除博客
    if(method === 'POST' && req.path === '/api/blog/del'){
        const author = 'lisi'//假数据在开发登录时再改成真实数据
        const result = delBlog(id, author)
        return result.then(val => {
            if(val){
                return new SuccessModel()
            }else {
                return new ErrorModel('删除博客失败')
            }
        })

    }

}

module.exports = handleBlogRouter