import{_ as n,c as a,o as p,ah as e,bx as l}from"./chunks/framework.kZi0S3Z0.js";const k=JSON.parse('{"title":"WebSocket","description":"","frontmatter":{"outline":"deep"},"headers":[],"relativePath":"java/webSocket.md","filePath":"java/webSocket.md"}'),i={name:"java/webSocket.md"};function t(c,s,o,r,d,u){return p(),a("div",null,[...s[0]||(s[0]=[e('<h1 id="websocket" tabindex="-1">WebSocket <a class="header-anchor" href="#websocket" aria-label="Permalink to “WebSocket”">​</a></h1><blockquote><p>http通信时单向的，先请求，后响应，而WebSocket时双向通信，没有请求也可以响应，双向通信，实时响应，适用于高实时的的场景，需要服务器主动给客户端推送数据</p></blockquote><h2 id="java使用websocket" tabindex="-1">java使用Websocket <a class="header-anchor" href="#java使用websocket" aria-label="Permalink to “java使用Websocket”">​</a></h2><p>导入坐标，注册服务器端对象到ioc容器 <img src="'+l+`" alt=""></p><p>我们服务器需要用一个map存会话对象，比如存手机号码，以后没有给我们发消息，我们可以根据地址主动给会话发消息</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>key    value</span></span>
<span class="line"><span>对象1   交房租啦</span></span>
<span class="line"><span>对象2   交房租啦</span></span>
<span class="line"><span>对象3   交房租啦</span></span></code></pre></div><p>比如我们可以通过定时任务，每隔一段时间发送一些数据，也可以群发，比如月底短信通知</p><p>也可以根据会话对象推送不同的数据，比如你是会员，我可以让你看所有电视，你是普通用户，只能看免费电视</p><p>或者弹幕，你输入数据存到后台后，后台实时通过WebSocket推送</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>/**</span></span>
<span class="line"><span> * @ServerEndpoint 注解是一个类层次的注解，它的功能主要是将目前的类定义成一个websocket服务器端,</span></span>
<span class="line"><span> * 注解的值将被用于监听用户连接的终端访问URL地址,客户端可以通过这个URL来连接到WebSocket服务器端。</span></span>
<span class="line"><span> */</span></span>
<span class="line"><span>@Component</span></span>
<span class="line"><span>@Slf4j</span></span>
<span class="line"><span>@ServerEndpoint(&quot;/ws/{cid}&quot;)</span></span>
<span class="line"><span>public class WebSocketServer {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    //存放会话对象</span></span>
<span class="line"><span>    private static Map&lt;String, Session&gt; sessionMap = new ConcurrentHashMap();</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    /**</span></span>
<span class="line"><span>     * 连接建立成功调用的方法</span></span>
<span class="line"><span>     */</span></span>
<span class="line"><span>    @OnOpen</span></span>
<span class="line"><span>    public void onOpen(Session session, @PathParam(&quot;cid&quot;) String cid) {</span></span>
<span class="line"><span>        System.out.println(&quot;客户端：&quot; + cid + &quot;建立连接&quot;);</span></span>
<span class="line"><span>        sessionMap.put(cid, session);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    /**</span></span>
<span class="line"><span>     * 连接关闭调用的方法</span></span>
<span class="line"><span>     * @param cid</span></span>
<span class="line"><span>     */</span></span>
<span class="line"><span>    @OnClose</span></span>
<span class="line"><span>    public void onClose(@PathParam(&quot;cid&quot;) String cid) {</span></span>
<span class="line"><span>        System.out.println(&quot;连接断开:&quot; + cid);</span></span>
<span class="line"><span>        sessionMap.remove(cid);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>    /**</span></span>
<span class="line"><span>     * 监听客户端发送过来的消息</span></span>
<span class="line"><span>     * @param message 客户端发送过来的消息</span></span>
<span class="line"><span>     * @param cid 客户端ID</span></span>
<span class="line"><span>     */</span></span>
<span class="line"><span>    @OnMessage</span></span>
<span class="line"><span>    public void onMessage(String message, @PathParam(&quot;cid&quot;) String cid) {</span></span>
<span class="line"><span>        System.out.println(&quot;收到来自客户端：&quot; + cid + &quot;的信息:&quot; + message);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    /**</span></span>
<span class="line"><span>     * 群发消息</span></span>
<span class="line"><span>     * @param message</span></span>
<span class="line"><span>     */</span></span>
<span class="line"><span>    public void sendToAllClient(String message) {</span></span>
<span class="line"><span>        Collection&lt;Session&gt; sessions = sessionMap.values();</span></span>
<span class="line"><span>        for (Session session : sessions) {</span></span>
<span class="line"><span>            try {</span></span>
<span class="line"><span>                //服务器向客户端发送消息</span></span>
<span class="line"><span>                session.getBasicRemote().sendText(message);</span></span>
<span class="line"><span>            } catch (Exception e) {</span></span>
<span class="line"><span>                e.printStackTrace();</span></span>
<span class="line"><span>            }</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>获取后发送：</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>@Component</span></span>
<span class="line"><span>public class WebSocketTask {</span></span>
<span class="line"><span>    @Autowired</span></span>
<span class="line"><span>    private WebSocketServer webSocketServer;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    /**</span></span>
<span class="line"><span>     * 通过WebSocket每隔5秒向客户端发送消息</span></span>
<span class="line"><span>     */</span></span>
<span class="line"><span>    // @Scheduled(cron = &quot;0/5 * * * * ?&quot;)</span></span>
<span class="line"><span>    public void sendMessageToClient() {</span></span>
<span class="line"><span>        webSocketServer.sendToAllClient(&quot;这是来自服务端的消息：&quot; + DateTimeFormatter.ofPattern(&quot;HH:mm:ss&quot;).format(LocalDateTime.now()));</span></span>
<span class="line"><span>    }</span></span></code></pre></div><p>应用：来单提醒，客户催单~ 用户支付后，商户收到提醒，可以下单啦</p><p>在订单支付成功后，发送消息给客户端</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>@Autowired</span></span>
<span class="line"><span>private WebSocketServer webSocketServer;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 订单支付</span></span>
<span class="line"><span>public OrderPaymentVO payment(OrdersPaymentDTO ordersPaymentDTO) throws Exception {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // 1.直接修改订单状态</span></span>
<span class="line"><span>    Orders ordersDB = orderMapper.getByNumber(ordersPaymentDTO.getOrderNumber());</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // 根据订单id更新订单的状态、支付方式、支付状态、结账时间</span></span>
<span class="line"><span>    Orders orders = Orders.builder()</span></span>
<span class="line"><span>        .id(ordersDB.getId())</span></span>
<span class="line"><span>        .status(Orders.TO_BE_CONFIRMED)</span></span>
<span class="line"><span>        .payStatus(Orders.PAID)</span></span>
<span class="line"><span>        .checkoutTime(LocalDateTime.now())</span></span>
<span class="line"><span>        .build();</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    orderMapper.update(orders);</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>    //--------- webSocket 发送消息给客户端 ------------</span></span>
<span class="line"><span>    Map map = new HashMap();</span></span>
<span class="line"><span>    map.put(&quot;type&quot;, 1);//消息类型，1表示来单提醒</span></span>
<span class="line"><span>    map.put(&quot;orderId&quot;, orders.getId());</span></span>
<span class="line"><span>    map.put(&quot;content&quot;, &quot;订单号：&quot; + ordersPaymentDTO.getOrderNumber());</span></span>
<span class="line"><span>    //通过WebSocket实现来单提醒，向客户端浏览器推送消息</span></span>
<span class="line"><span>    webSocketServer.sendToAllClient(JSON.toJSONString(map));//转换为json</span></span>
<span class="line"><span>    //--------- webSocket 发送消息给客户端 ------------</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // 2. 返回一个空结果</span></span>
<span class="line"><span>    return new OrderPaymentVO();</span></span>
<span class="line"><span>}</span></span></code></pre></div>`,15)])])}const h=n(i,[["render",t]]);export{k as __pageData,h as default};
