const Koa = require('koa')
const Router = require('@koa/router')
​const { PrismaClient } = require('@prisma/client')
const bodyParser = require('koa-bodyparser')
​
const app = new Koa()
​
const prisma = new PrismaClient()
// 实例化路由器，并设置公共路由前缀 /users
const router = new Router({
  prefix: '/users'
})
​
app.use(bodyParser())
​
// 查询用户列表
router.get('/', async ctx => {
    const users = await prisma.user.findMany()
    ​
    ctx.body = users
})
​
// 查询单个用户
router.get('/:id', async ctx => {
    const id = parseInt(ctx.params.id)
    const user = await prisma.user.findUnique({
      where: { id }
    })
  ​
    ctx.body = user
})
​
// 创建用户
router.post('/', async ctx => {
    ​const user = ctx.request.body
    const newUser = await prisma.user.create({
    data: user
    })
    ​
    ctx.body = newUser
})
​
// 更新用户
router.patch('/:id', async ctx => {
    ​const id = parseInt(ctx.params.id)
     const updateUser = ctx.request.body
    ​
     const user = await prisma.user.update({
       where: {
         id
       },
       data: updateUser
    })
    ​
     ctx.body = user

})
​
// 删除用户
router.delete('/:id', async ctx => {
    ​const id = parseInt(ctx.params.id)
     const user = await prisma.user.delete({
       where: {
         id
       }
    })
    ​
     ctx.body = user
})
​
// 注册路由中间件
app.use(router.routes()).use(router.allowedMethods())
​
app.listen(3000, () => {
  console.log('服务器运行在 3000 端口')
})
