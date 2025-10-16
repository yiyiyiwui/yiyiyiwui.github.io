import{_ as a,c as n,o as p,ah as e,aJ as i,aK as l,aL as t,aM as c,aN as o,aO as r,aP as h,aQ as u,aR as g,aS as d}from"./chunks/framework.kZi0S3Z0.js";const C=JSON.parse('{"title":"MQ","description":"","frontmatter":{"outline":"deep"},"headers":[],"relativePath":"java/mq.md","filePath":"java/mq.md"}'),b={name:"java/mq.md"};function k(m,s,q,f,y,v){return p(),n("div",null,[...s[0]||(s[0]=[e('<h1 id="mq" tabindex="-1">MQ <a class="header-anchor" href="#mq" aria-label="Permalink to “MQ”">​</a></h1><blockquote><p>每个微服务之间通信方式有两种，同步和异步，Feign就是基于http协议的同步通信方式，而MQ是微服务异步调用的方式。</p></blockquote><h2 id="先来个小案例" tabindex="-1">先来个小案例： <a class="header-anchor" href="#先来个小案例" aria-label="Permalink to “先来个小案例：”">​</a></h2><p>假设我们做了个12306系统，我们买票成功后，需要做以下几件事：调用库存系统扣减车票库存，调用短信系统给用户发送短信，调用邮件系统给用户发邮件，调用第三方客户端通知买票成功。那么如果这几个服务一直能正常服务，产品经理不在有新的需求变更，那也可称得上现世安稳，岁月静好。可是万一有一天出现这么两种情况可怎么办呢？</p><p>1：产品经理提需求，好多人关注了我们12306微信客户端，我们需要买票成功后在通知微信小程序。那么我们又需要修改订单系统的代码。一次还好，如果隔一段时间发生一件这样的事，那谁能忍受？</p><p>2： 某一天，短信系统挂了，然后客户成功买到一张票，然后呢是短信也没收到，邮件也没收到，库存也没扣，这还得了。你短信系统坏了，我邮件系统好好的，凭什么影响我，让客户收不到邮件，这就不合理。所以呢，还是各个系统之间的耦合太高了，我们应该解耦。这个时候我们就需要一个中间人来帮我们解决这个问题，那么我们看MQ如何帮我们解决这件棘手的事情。 <img src="'+i+'" alt=""> 之前用Feign是这样的：同步调用 <img src="'+l+'" alt=""> 用了MQ后可以这样：异步调用</p><p>MQ（消息队列 ）是在消息的传输过程中保存消息的容器，就如上案例一样，我们可以来做一个中间的容器，你执行成功失败不会影响别的微服务系统运行 <img src="'+t+'" alt=""><img src="'+c+'" alt=""> 如上图所示，如果用户买了票，我这边可以告诉中间件Broker，然后MQ告诉其他需要执行的业务，其他业务只需要订阅Broker就可以收到消息。如果后面还有其他服务，只需要订阅Broker就可以了，不会影响其他代码的运行，删除也一样。 同时也提高了响应速度。</p><h3 id="注" tabindex="-1">注： <a class="header-anchor" href="#注" aria-label="Permalink to “注：”">​</a></h3><p>同步调用实效性强，可以直接得到结果，如果直接查询，需要实时性高，Feign比较好，比如我查询订单，你后台半天没返回数据，就会影响客户体验。但如果涉及相应的处理，并且复杂度比较高，或者后期变动情况比较大，还是推荐使用MQ异步，减少后期维护的麻烦，减轻重复工作的可能</p><h2 id="问题-如果多人访问-发送的请求多了怎么办" tabindex="-1">问题：如果多人访问，发送的请求多了怎么办？ <a class="header-anchor" href="#问题-如果多人访问-发送的请求多了怎么办" aria-label="Permalink to “问题：如果多人访问，发送的请求多了怎么办？”">​</a></h2><p>Broker中间是队列，可以帮你拦截，谁先买的票，先帮谁处理 <img src="'+o+'" alt=""></p><h2 id="问题-mq的缺点是什么" tabindex="-1">问题：MQ的缺点是什么？ <a class="header-anchor" href="#问题-mq的缺点是什么" aria-label="Permalink to “问题：MQ的缺点是什么？”">​</a></h2><p><img src="'+r+`" alt=""> 最致命的却带你是假如中间MQ出现了宕机，其他系统也不能执行了。</p><p>而最常用的消息队列是RabbitMQ，RabbitMQ是基于AMQP的一款消息中间件管理系统</p><p>• <a href="https://www.rabbitmq.com/" target="_blank" rel="noreferrer">官网地址</a></p><p>首先在linux安装</p><p>下载镜像：</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>docker pull rabbitmq:3.8-management</span></span></code></pre></div><p>安装MQ：</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>docker run \\</span></span>
<span class="line"><span> -v mq-plugins:/plugins \\</span></span>
<span class="line"><span> --name=mq \\</span></span>
<span class="line"><span> -p 15672:15672 \\</span></span>
<span class="line"><span> -p 5672:5672 \\</span></span>
<span class="line"><span> -d \\</span></span>
<span class="line"><span> rabbitmq:3.8-management</span></span></code></pre></div><p>账号密码初始都是：guest 开发中咱们不会接触管理员用户，所以这里创建自己的用户 <img src="`+h+'" alt=""> 因为要用多个微服务，对应的也有数据库，为了更好区分，我们要隔离起来创建各自项目的虚拟主机 <img src="'+u+'" alt=""> 之后管理员给这个用户的虚拟主机分配权限</p><p>RabbitMQ消息队列主要分为两种，一种就类似于Feign，点对点模型。另一种是就是分布式的，发布/订阅模型 <img src="'+g+'" alt=""> 发布者发布消息后，我们通过交换机接收消息，然后传给队列，队列存储消息，然后再发给各个消费者，生产者能发多个消息，也可以有多个交换机接收，同样，交换机也可以发送多个消息给队列，队列也可以给多个消费者发送消息。</p><h2 id="问题-在mq中怎么和feign一样发送接收消息呢" tabindex="-1">问题：在MQ中怎么和Feign一样发送接收消息呢？ <a class="header-anchor" href="#问题-在mq中怎么和feign一样发送接收消息呢" aria-label="Permalink to “问题：在MQ中怎么和Feign一样发送接收消息呢？”">​</a></h2><p><img src="'+d+`" alt=""> 1：首先我们先在生产方建立连接工厂，创建连接对象和通道</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>public void testSendMessage() throws IOException, TimeoutException {</span></span>
<span class="line"><span>    // 1.建立连接</span></span>
<span class="line"><span>    ConnectionFactory factory = new ConnectionFactory();</span></span>
<span class="line"><span>    // 1.1.设置连接参数，分别是：主机名、端口号、vhost、用户名、密码</span></span>
<span class="line"><span>    factory.setHost(&quot;192.168.200.130&quot;);</span></span>
<span class="line"><span>    factory.setPort(5672);</span></span>
<span class="line"><span>    factory.setVirtualHost(&quot;/quick&quot;);</span></span>
<span class="line"><span>    factory.setUsername(&quot;itheima&quot;);</span></span>
<span class="line"><span>    factory.setPassword(&quot;123456&quot;);</span></span>
<span class="line"><span>    // 1.2.建立连接</span></span>
<span class="line"><span>    Connection connection = factory.newConnection();</span></span>
<span class="line"><span>    // 2.创建通道Channel</span></span>
<span class="line"><span>    Channel channel = connection.createChannel();</span></span>
<span class="line"><span>    // 3.创建队列</span></span>
<span class="line"><span>    String queueName = &quot;simple.queue&quot;;</span></span>
<span class="line"><span>    channel.queueDeclare(queueName, false, false, false, null);</span></span>
<span class="line"><span>    // 4.发送消息</span></span>
<span class="line"><span>    String message = &quot;hello, rabbitmq!&quot;;</span></span>
<span class="line"><span>    channel.basicPublish(&quot;&quot;, queueName, null, message.getBytes());</span></span>
<span class="line"><span>    System.out.println(&quot;发送消息成功：【&quot; + message + &quot;】&quot;);</span></span>
<span class="line"><span>    // 5.关闭通道和连接</span></span>
<span class="line"><span>    channel.close();</span></span>
<span class="line"><span>    connection.close();</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>2 ：在消费者接收</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>public static void main(String[] args) throws IOException, TimeoutException {</span></span>
<span class="line"><span>       // 1.建立连接</span></span>
<span class="line"><span>       ConnectionFactory factory = new ConnectionFactory();</span></span>
<span class="line"><span>       // 1.1.设置连接参数，分别是：主机名、端口号、vhost、用户名、密码</span></span>
<span class="line"><span>       factory.setHost(&quot;192.168.200.130&quot;);</span></span>
<span class="line"><span>       factory.setPort(5672);</span></span>
<span class="line"><span>       factory.setVirtualHost(&quot;/quick&quot;);</span></span>
<span class="line"><span>       factory.setUsername(&quot;itheima&quot;);</span></span>
<span class="line"><span>       factory.setPassword(&quot;123456&quot;);</span></span>
<span class="line"><span>       // 1.2.建立连接</span></span>
<span class="line"><span>       Connection connection = factory.newConnection();</span></span>
<span class="line"><span>       // 2.创建通道Channel</span></span>
<span class="line"><span>       Channel channel = connection.createChannel();</span></span>
<span class="line"><span>       // 3.创建队列</span></span>
<span class="line"><span>       String queueName = &quot;simple.queue&quot;;</span></span>
<span class="line"><span>       channel.queueDeclare(queueName, false, false, false, null);</span></span>
<span class="line"><span>       // 4.订阅消息</span></span>
<span class="line"><span>       channel.basicConsume(queueName, true, new DefaultConsumer(channel){</span></span>
<span class="line"><span>           @Override</span></span>
<span class="line"><span>           public void handleDelivery(String consumerTag, Envelope envelope,</span></span>
<span class="line"><span>                                      AMQP.BasicProperties properties, byte[] body) throws IOException {</span></span>
<span class="line"><span>               // 5.处理消息</span></span>
<span class="line"><span>               String message = new String(body);</span></span>
<span class="line"><span>               System.out.println(&quot;接收到消息：【&quot; + message + &quot;】&quot;);</span></span>
<span class="line"><span>           }</span></span>
<span class="line"><span>       });</span></span>
<span class="line"><span>       System.out.println(&quot;消费者等待接收消息。。。。&quot;);</span></span>
<span class="line"><span>   }</span></span></code></pre></div><h2 id="问题-代码繁琐-有简化的吗" tabindex="-1">问题：代码繁琐，有简化的吗？ <a class="header-anchor" href="#问题-代码繁琐-有简化的吗" aria-label="Permalink to “问题：代码繁琐，有简化的吗？”">​</a></h2><p>Spring基于AMQP协议定义的一套API规范，提供了模板来发送和接收消息</p><p>1： 引入依赖</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>&lt;!--AMQP依赖，包含RabbitMQ--&gt;</span></span>
<span class="line"><span>        &lt;dependency&gt;</span></span>
<span class="line"><span>            &lt;groupId&gt;org.springframework.boot&lt;/groupId&gt;</span></span>
<span class="line"><span>            &lt;artifactId&gt;spring-boot-starter-amqp&lt;/artifactId&gt;</span></span>
<span class="line"><span>        &lt;/dependency&gt;</span></span></code></pre></div><p>2：生产者：</p><p>添加配置文件</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>spring:</span></span>
<span class="line"><span>  rabbitmq:</span></span>
<span class="line"><span>    host: 192.168.200.130 # 主机名</span></span>
<span class="line"><span>    port: 5672 # 端口</span></span>
<span class="line"><span>    virtual-host: /quick # 虚拟主机</span></span>
<span class="line"><span>    username: itheima # 用户名</span></span>
<span class="line"><span>    password: 123456 # 密码</span></span></code></pre></div><p>代码：</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>注入方法：</span></span>
<span class="line"><span>  @Autowired</span></span>
<span class="line"><span>  private RabbitTemplate rabbitTemplate;</span></span>
<span class="line"><span></span></span>
<span class="line"><span> public void test1(){</span></span>
<span class="line"><span>        //队列名称</span></span>
<span class="line"><span>        String queueName =&quot;simple.queue&quot;;</span></span>
<span class="line"><span>        //消息内容</span></span>
<span class="line"><span>        String msg = &quot;Hello World&quot;;</span></span>
<span class="line"><span>        //发送消息，这里的方法是把消息转换为字节，需要接收两个参数，向哪个队列发？ 发什么？</span></span>
<span class="line"><span>        rabbitTemplate.convertAndSend(queueName,msg);</span></span>
<span class="line"><span>    }</span></span></code></pre></div><p>消费者：</p><p>添加配置文件</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>spring:</span></span>
<span class="line"><span>  rabbitmq:</span></span>
<span class="line"><span>    host: 192.168.200.130 # 主机名</span></span>
<span class="line"><span>    port: 5672 # 端口</span></span>
<span class="line"><span>    virtual-host: /quick # 虚拟主机</span></span>
<span class="line"><span>    username: itheima # 用户名</span></span>
<span class="line"><span>    password: 123456 # 密码</span></span></code></pre></div><p>代码</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>//监听简单的消息</span></span>
<span class="line"><span>@RabbitListener(queues = &quot;simple.queue&quot;) //监听队列                           @RabbitListener(queuesToDeclare = @Queue(&quot;simple.queue&quot;)) // 如果mq中没有队列，就会创建</span></span>
<span class="line"><span>public void listenSimpleQueue(String msg) {</span></span>
<span class="line"><span>    System.out.println(&quot;接收消息：&quot;+msg);</span></span>
<span class="line"><span>}</span></span></code></pre></div><h2 id="问题-如果生产者生产了10条消息-消费者不能一下子接收那么多消息-会怎么样-怎么处理" tabindex="-1">问题：如果生产者生产了10条消息，消费者不能一下子接收那么多消息，会怎么样？怎么处理? <a class="header-anchor" href="#问题-如果生产者生产了10条消息-消费者不能一下子接收那么多消息-会怎么样-怎么处理" aria-label="Permalink to “问题：如果生产者生产了10条消息，消费者不能一下子接收那么多消息，会怎么样？怎么处理?”">​</a></h2><p>会出现消息堆积，我们可以开启工作者模式，也就是说弄两个消费者a和b，同时接收消息，a接收1，3，5 。b接收2，4，6。这样的话就可以均匀接收消息了，哪怕有个消费者挂了，也还有消费者接收消息</p><p>消费者：</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>// 监听工作消息</span></span>
<span class="line"><span>// 消费者a</span></span>
<span class="line"><span>@RabbitListener(queuesToDeclare = @Queue(&quot;work.queue&quot;)) //MQ中没有队列，所以我们这里创建一个</span></span>
<span class="line"><span>public void listenWorkQueue1(String msg)throws Exception{</span></span>
<span class="line"><span>    System.out.println(&quot;消费者1接收：&quot;+msg);</span></span>
<span class="line"><span>    Thread.sleep(20); //延迟时间</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>//消费者b</span></span>
<span class="line"><span>@RabbitListener(queuesToDeclare = @Queue(&quot;work.queue&quot;))</span></span>
<span class="line"><span>public void listenWorkQueue2(String msg)throws Exception{</span></span>
<span class="line"><span>    System.err.println(&quot;消费者2接收：&quot;+msg);</span></span>
<span class="line"><span>    Thread.sleep(200);//延迟时间</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>但是这里虽然分配给了两个消费者，但是没有考虑到消费者的处理能力和性能的差异化，所以这里我们设置prefetch来控制消费者预取的数量，在消费者的配置文件中添加</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>spring:</span></span>
<span class="line"><span>  rabbitmq:</span></span>
<span class="line"><span>    listener:</span></span>
<span class="line"><span>      simple:</span></span>
<span class="line"><span>        prefetch: 1 # 消费者一次处理一条消息，处理完毕后再从MQ中获取</span></span></code></pre></div>`,47)])])}const Q=a(b,[["render",k]]);export{C as __pageData,Q as default};
