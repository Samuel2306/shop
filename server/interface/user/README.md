### 登录和用户身份验证

模式：利用用户名和 jsonwebtoken 模块生成一个令牌，作为用户的身份标识，每次请求用户需要将令牌带过来，并且令牌拥有过期时间

问题：jsonwebtoken本身不会在用户使用合法令牌访问时，自动更新令牌的过期时间

解决方案：jwt-autorefresh实现令牌的自动刷新


### 采用jwt-autorefresh，客户端发起每个请求的大致流程：

1、判断本地存储的 AccessToken 是否临近过期。如果是，跳转到流程 2；如果不是，跳转到流程 6。

2、传递本地存储的 RefreshToken 给服务端以续约，跳转到流程 3。

3、服务端判断 RefreshToken 是否有效。如果有效，生成新的 AccessToken+RefreshToken 返回给客户端，跳转到流程 4；如果无效，跳转到流程 5。

4、客户端记录续约后的 AccessToken+RefreshToken，自动返回流程 1。

5、客户端提示登录已过期，引导重新登录，流程结束。

6、服务端判断 AccessToken 是否有效。如果有效，返回响应；如果无效，返回异常。


