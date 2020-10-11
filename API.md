
# API
## 概述
API的基础URL为 `/api/`，下文接口的URL都以此为基础。例如`account/login`的完整URL path是`/api/account/login`。
每个接口的URL都以`/`结尾
接口返回结果的格式为：
```json
{
  "code": "OK", // "OK" 表示成功，"ERR" 表示出错
  "msg": "", // 调用结果描述，一般为空
  "data": "anything" // 接口的业务数据，不同的接口此项内容/格式不同
}
```
下文Response中`code`、`msg`可能被忽略。

## 账号  / account
### Login
用户通过账号、密码登陆。
#### Request
`POST` `account/login`
```json
{
  "username": "login-id",
  "password": "passw0rd"
}
```
#### Response
登陆成功时：
```json
{
  "code": "OK",
  "data": {
      "shop": [{
          "id": 123,
          "name": "张三的零食铺",
          "createdAt": "2020-10-10 13:30:00"
      }],
      "user": {
          "id": 123,
          "username": "zhangsan", // 登陆名
          "icon": ":smileface:",  // 头像图标
          "nickname": "张三",     // 昵称，用于展示
          "mobile": "13712341234",
          "email": "abc@abc.com",
          "createdAt": "2020-10-10 12:30:00"
      },
      "token": "token abcxxx/123="
  }
}
```
`data`中：
- `shop`表示店铺信息，是一个数组，取数组第一个作为当前用户的操作店铺
- `user` 是用户信息
- `token`是授权token，用于标识用户登陆状态。

**注意**，后续调用其他需要验证身份的接口时需要将这个值放在`Authorization` HTTP 头中，例如:
```text
GET /api/account/self
Authorization: token abcxxx/123=
```
对于需要登陆才能访问的接口，如果没有`Authorization` HTTP 头或者token不正确，会返回 HTTP 401，响应体内容类似：
```json
{
    "code": "ERR",
    "msg": "请先登陆"
}
```
登陆出错时：
```json
{
    "code": "ERR",
    "msg": "用户名、密码不匹配"
}
```


## 库存 / stock
商品的单词是`good`

### 获取库存商品列表
#### Request
`GET` `shop/${shopId}/stock/`
#### Response
```json
{
    "data": {
        "summary": {
            "goodCnt": 100, // 商品款数
            "itemCnt": 200  // 库存总量
        },
        "list": [{          // 商品列表
            "id": 123,
            "name": "商品名称",
            "icon": ":icon:",
            "specs": {
                "颜色": ["红", "黄", "蓝"],
                "尺寸": ["大", "中", "小"]
            },
            "stock": {
                "红/大": 100,
                "黄/小": 100
            }
        }]
    }
}
```

### 增加库存商品
#### Request
`POST` `shop/${shopId}/stock/`
body为商品详情
```json
{
    "name": "商品名称",
    "icon": ":icon:",
    "specs": {
        "颜色": ["红", "黄", "蓝"],
        "尺寸": ["大", "中", "小"]
    },
    "stock": {
        "红/大": 100,
        "黄/小": 100
    }
}
```
#### Response
```json
{
    "code": "OK",
    "msg": "添加成功",
    "data": {
        "id": 123
    }
}
```

### 删除库存商品
#### Request
`DELETE` `shop/${shopId}/stock/${goodId}/`
#### Response
```json
{
    "code": "OK",
    "msg": "删除成功"
}
```

### 更新库存商品信息
#### Request
`POST` `shop/${shopId}/stock/${goodId}/`
body为商品详情
```json
{
    "id": 123,
    "name": "商品名称",
    "icon": ":icon:",
    "specs": {
        "颜色": ["红", "黄", "蓝"],
        "尺寸": ["大", "中", "小"]
    },
    "stock": {
        "红/大": 100,
        "黄/小": 100
    }
}
```
#### Response
```json
{
    "code": "OK",
    "msg": "更新成功"
}
```

## 客户 / customer
### 获取客户列表
#### Request
`GET` `shop/${shopId}/customer/`
#### Response
```json
{
    "data": [{
        "id": 123,
        "name": "张三",
        "icon": ":icon:",
        "wechat": "abc",
        "mobile": "13812341234",
        "company": "公司名称",
        "balance": 180,
        "address": "收货地址",
        "note": "客户备注信息"
    }]
}
```

### 获取客户资金流水
#### Request
`GET` `shop/${shopId}/customer/${customerId}/balanceLog/`
#### Response
```json
{
    "data": [{
        "id": 123,
        "amount": 100,
        "op": "充值",
        "date": "2020-10-11 12:00:00",
        "note": "支付宝红包"
    }]
}
```

### 创建客户
#### Request
`POST` `shop/${shopId}/customer/`
```json
{
    "name": "张三",
    "icon": ":icon:",
    "wechat": "abc",
    "mobile": "13812341234",
    "company": "公司名称",
    "balance": 180,
    "address": "收货地址",
    "note": "客户备注信息"
}
```

### 删除客户
#### Request
`DELETE` `shop/${shopId}/customer/${customerId}/`

### 更新客户信息
#### Request
`POST` `shop/${shopId}/customer/${customerId}/`
```json
{
    "id": 123,
    "name": "张三",
    "icon": ":icon:",
    "wechat": "abc",
    "mobile": "13812341234",
    "company": "公司名称",
    "balance": 180,
    "address": "收货地址",
    "note": "客户备注信息"
}
```

### 增加客户资金变动记录
#### Request
`POST` `shop/${shopId}/customer/${customerId}/balanceLog/`
```json
{
    "id": 123,
    "amount": 100,
    "op": "充值",
    "date": "2020-10-11 12:00:00",
    "note": "支付宝红包"
}
```

## 订单 / order
### 获取订单列表
#### Request
`GET` `shop/${shopId}/order/?goodId=123&customerId=123&cursor=123&limit=200`

- `goodId` 可选，表示按商品id搜索
- `customerId` 可选，表示按客户id搜索
- `cursor` 可选，用于分页
- `limit` 可选，表示一次获取多少条数据

#### Response
```json
{
    "data": {
        "list": [{
            "id": 123,
            "customer": {
                "id": 123,
                "icon": ":icon:",
                "name": "张三"
            },
            "goods": [{
                "id": 123,
                "name": "商品名称",
                "specs": {
                    "红/大": 100
                }
            }],
            "date": "2020-10-11 12:00:00",
            "address": "收货地址",
            "priceTotal": 100,
            "note": "客户自取，无需配送"
        }],
        "cursor": 123
    }
}
```

### 创建订单
#### Request
`POST` `shop/${shopId}/order/`
```json
{
    "customerId": 123,
    "goods": [{
        "id": 123,
        "specs": {
            "红/大": 10
        }
    }],
    "address": "收货地址，默认为客户当前地址",
    "priceTotal": 100,
    "note": "客户自取，无需配送"
}
```

### 删除订单
#### Request
`DELETE` `shop/${shopId}/order/${orderId}/`

### 更新订单信息
#### Request
`POST` `shop/${shopId}/order/${orderId}/`
```json
{
    "id": 123,
    "customerId": 123,
    "goods": [{
        "id": 123,
        "specs": {
            "红/大": 10
        }
    }],
    "address": "收货地址，默认为客户当前地址",
    "priceTotal": 100,
    "note": "客户自取，无需配送"
}
```

> Written with [StackEdit](https://stackedit.io/).
