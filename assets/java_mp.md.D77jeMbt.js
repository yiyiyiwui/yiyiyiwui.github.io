import{_ as a,c as n,o as p,ah as e,aH as l,aI as t}from"./chunks/framework.kZi0S3Z0.js";const b=JSON.parse('{"title":"MybatisPlus","description":"","frontmatter":{"outline":"deep"},"headers":[],"relativePath":"java/mp.md","filePath":"java/mp.md"}'),i={name:"java/mp.md"};function r(c,s,d,o,u,g){return p(),n("div",null,[...s[0]||(s[0]=[e(`<h1 id="mybatisplus" tabindex="-1">MybatisPlus <a class="header-anchor" href="#mybatisplus" aria-label="Permalink to “MybatisPlus”">​</a></h1><blockquote><p>自动填充 时间、分页插件、逻辑删除、代码生成器</p></blockquote><h2 id="使用" tabindex="-1">使用 <a class="header-anchor" href="#使用" aria-label="Permalink to “使用”">​</a></h2><p>导入依赖</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>&lt;!--mybatis plus依赖--&gt;</span></span>
<span class="line"><span>&lt;dependency&gt;</span></span>
<span class="line"><span>    &lt;groupId&gt;com.baomidou&lt;/groupId&gt;</span></span>
<span class="line"><span>    &lt;artifactId&gt;mybatis-plus-boot-starter&lt;/artifactId&gt;</span></span>
<span class="line"><span>    &lt;version&gt;3.4.1&lt;/version&gt;</span></span>
<span class="line"><span>&lt;/dependency&gt;</span></span></code></pre></div><p>连接配置文件：</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>spring:</span></span>
<span class="line"><span>  datasource:</span></span>
<span class="line"><span>    # 使用druid连接池</span></span>
<span class="line"><span>    type: com.alibaba.druid.pool.DruidDataSource</span></span>
<span class="line"><span>    # 数据源配置</span></span>
<span class="line"><span>    druid:</span></span>
<span class="line"><span>      driver-class-name: com.mysql.cj.jdbc.Driver</span></span>
<span class="line"><span>      url: jdbc:mysql://localhost:3306/mp_demo?useUnicode=true&amp;IntegerEncoding=utf8&amp;useSSL=false&amp;servertimeZone=Asia/Shanghai</span></span>
<span class="line"><span>      username: root</span></span>
<span class="line"><span>      password: root</span></span>
<span class="line"><span></span></span>
<span class="line"><span>mybatis-plus:</span></span>
<span class="line"><span>  configuration:</span></span>
<span class="line"><span>    # 开启驼峰命名规则，默认true开启</span></span>
<span class="line"><span>    map-underscore-to-camel-case: true</span></span>
<span class="line"><span>    # 控制台日志打印，便于查看SQL</span></span>
<span class="line"><span>    log-impl: org.apache.ibatis.logging.stdout.StdOutImpl</span></span></code></pre></div><p>ORM O是对象实体类 R是数据库表 M是把表和实体类建立映射关系 有了数据库和实体类后，我们创建一个Mapper接口：在接口上继承</p><blockquote><p>extends BaseMapper&lt;实体类名&gt;</p></blockquote><p>直接导入使用：</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>@Autowired</span></span>
<span class="line"><span>   private ProductMapper productMapper;</span></span>
<span class="line"><span>// 查询</span></span>
<span class="line"><span>   @Test</span></span>
<span class="line"><span>   public void test01()throws Exception{</span></span>
<span class="line"><span>       // 根据id查询</span></span>
<span class="line"><span>       Product product = productMapper.selectById(1L);</span></span>
<span class="line"><span>       System.out.println(product);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>       // 查询所有</span></span>
<span class="line"><span>       List&lt;Product&gt; list = productMapper.selectList(null);</span></span>
<span class="line"><span>       list.forEach(System.out::println);</span></span>
<span class="line"><span>   }</span></span>
<span class="line"><span>   // 新增（支持动态sql）</span></span>
<span class="line"><span>   @Test</span></span>
<span class="line"><span>   public void test02()throws Exception{</span></span>
<span class="line"><span>       // 模拟前端传入对象</span></span>
<span class="line"><span>       Product product = new Product();</span></span>
<span class="line"><span>       product.setId(13L);</span></span>
<span class="line"><span>       product.setPname(&quot;iphone14&quot;);</span></span>
<span class="line"><span>       product.setPrice(2999D);</span></span>
<span class="line"><span>       product.setNum(99);</span></span>
<span class="line"><span>       product.setBrand(&quot;苹果&quot;);</span></span>
<span class="line"><span>       // 调用mapper新增</span></span>
<span class="line"><span>       productMapper.insert(product);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>   }</span></span>
<span class="line"><span>   // 修改（支持动态sql）</span></span>
<span class="line"><span>   @Test</span></span>
<span class="line"><span>   public void test03()throws Exception{</span></span>
<span class="line"><span>       // 模拟前端传入对象</span></span>
<span class="line"><span>       Product product = new Product();</span></span>
<span class="line"><span>       product.setId(13L);</span></span>
<span class="line"><span>       product.setPrice(1999D);</span></span>
<span class="line"><span>       // 调用mapper修改</span></span>
<span class="line"><span>       productMapper.updateById(product);</span></span>
<span class="line"><span>   }</span></span>
<span class="line"><span>   // 删除</span></span>
<span class="line"><span>   @Test</span></span>
<span class="line"><span>   public void test04()throws Exception{</span></span>
<span class="line"><span>       productMapper.deleteById(13L);</span></span>
<span class="line"><span>   }</span></span></code></pre></div><p>如果类名和数据库名不一致的话，需要添加注解，如果一样的话，就不用写这个注解了</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>@TableName(&quot;tbl_product&quot;) //绑定表关系 写数据库表的名字</span></span></code></pre></div><h3 id="问题-如果多个表的前缀都一样-我们需要都在实体类上写注解-有什么好的办法吗" tabindex="-1">问题：如果多个表的前缀都一样，我们需要都在实体类上写注解，有什么好的办法吗？ <a class="header-anchor" href="#问题-如果多个表的前缀都一样-我们需要都在实体类上写注解-有什么好的办法吗" aria-label="Permalink to “问题：如果多个表的前缀都一样，我们需要都在实体类上写注解，有什么好的办法吗？”">​</a></h3><p>如果好多个表名前缀一样，都是tb_开头的，我们可以配置配置文件，这样的话，我们类名只用写后面的就可以，MybatisPlus会根据配置的前缀自动识别表名</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>mybatis-plus:</span></span>
<span class="line"><span>  global-config:</span></span>
<span class="line"><span>    db-config:</span></span>
<span class="line"><span>      table-prefix: tbl_ #表前缀</span></span></code></pre></div><h3 id="问题-每次我们都是根据表的主键id寻找数据-如果表的id和实体类的id不一致会怎么样" tabindex="-1">问题：每次我们都是根据表的主键id寻找数据，如果表的id和实体类的id不一致会怎么样？ <a class="header-anchor" href="#问题-每次我们都是根据表的主键id寻找数据-如果表的id和实体类的id不一致会怎么样" aria-label="Permalink to “问题：每次我们都是根据表的主键id寻找数据，如果表的id和实体类的id不一致会怎么样？”">​</a></h3><p>会报错，找不到对应的id。假如实体类主键id名字叫id，表的主键id叫pid，那么我们就需要在实体类的主键id上添加@TableId(value=”pid”)注解来识别数据表的主键id</p><h3 id="问题-如果我们用微服务-会有多个数据库-我们通过主键id添加查询的时候会有冲突-有什么办法解决" tabindex="-1">问题：如果我们用微服务，会有多个数据库，我们通过主键id添加查询的时候会有冲突，有什么办法解决？ <a class="header-anchor" href="#问题-如果我们用微服务-会有多个数据库-我们通过主键id添加查询的时候会有冲突-有什么办法解决" aria-label="Permalink to “问题：如果我们用微服务，会有多个数据库，我们通过主键id添加查询的时候会有冲突，有什么办法解决？”">​</a></h3><p>正常我们是用数据库id自增，如果单体项目可以使用，但要是多个项目的话就会冲突，所以我们需要给他设置一个唯一的id</p><blockquote><p><img src="`+l+`" alt=""></p></blockquote><p>我们可以在注解中指定主键类型 @TableId(value = “id”,type = IdType.AUTO) type就是设置主键类型，默认就是使用雪花算法，生成一个唯一的id</p><p>当然，如果大部分表都要设置的话，我们也可以在配置文件中设置</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>mybatis-plus:</span></span>
<span class="line"><span>  global-config:</span></span>
<span class="line"><span>    db-config:</span></span>
<span class="line"><span>      id-type: auto #主键策略</span></span>
<span class="line"><span>      table-prefix: tbl_ #表前缀</span></span></code></pre></div><h3 id="问题-上面是主键id不一样-要是还有其他名字不一样-有解决办法吗" tabindex="-1">问题：上面是主键id不一样，要是还有其他名字不一样，有解决办法吗？ <a class="header-anchor" href="#问题-上面是主键id不一样-要是还有其他名字不一样-有解决办法吗" aria-label="Permalink to “问题：上面是主键id不一样，要是还有其他名字不一样，有解决办法吗？”">​</a></h3><p>如果实体类跟数据表字段名不一致的话，我们可以添加@TableField(value=”数据表的名称”)，来修改</p><h3 id="问题-当实体类中有些特殊字段-在数据库表中没有-我们不排除会怎么样" tabindex="-1">问题：当实体类中有些特殊字段，在数据库表中没有，我们不排除会怎么样？ <a class="header-anchor" href="#问题-当实体类中有些特殊字段-在数据库表中没有-我们不排除会怎么样" aria-label="Permalink to “问题：当实体类中有些特殊字段，在数据库表中没有，我们不排除会怎么样？”">​</a></h3><p>如果不排除，会映射不到，所以我们可以通过在特殊字段上添加@Tablefield(exist=false)注解来排除，这样的话，增删改查就不会包含该字段了</p><h3 id="问题-每次创建用户时-都需要设置创建时间-修改-比较麻烦-有什么办法解决" tabindex="-1">问题：每次创建用户时，都需要设置创建时间，修改，比较麻烦，有什么办法解决？ <a class="header-anchor" href="#问题-每次创建用户时-都需要设置创建时间-修改-比较麻烦-有什么办法解决" aria-label="Permalink to “问题：每次创建用户时，都需要设置创建时间，修改，比较麻烦，有什么办法解决？”">​</a></h3><p>我们可以设置自动默认填充，这样就不用每次都手动填充。在需要配置的时间上面添加@TableField(fill = FieldFill.INSERT) 设置好之后我们需要指定要填充什么时间，所以这里我们需要一个配置类</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>@Slf4j</span></span>
<span class="line"><span>@Component</span></span>
<span class="line"><span>public class MyMetaObjectHandler implements MetaObjectHandler {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    @Override</span></span>
<span class="line"><span>    public void insertFill(MetaObject metaObject) {</span></span>
<span class="line"><span>        log.info(&quot;start insert fill ....&quot;);</span></span>
<span class="line"><span>        this.strictInsertFill(metaObject, &quot;createTime&quot;, Date.class, new Date()); // 起始版本 3.3.0(推荐使用)</span></span>
<span class="line"><span>        this.strictInsertFill(metaObject, &quot;lastUpdateTime&quot;, Date.class, new Date()); // 起始版本 3.3.0(推荐使用)</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    @Override</span></span>
<span class="line"><span>    public void updateFill(MetaObject metaObject) {</span></span>
<span class="line"><span>        log.info(&quot;start update fill ....&quot;);</span></span>
<span class="line"><span>        this.strictUpdateFill(metaObject, &quot;lastUpdateTime&quot;, Date.class, new Date()); // 起始版本 3.3.0(推荐)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div><h2 id="条件查询" tabindex="-1">条件查询 <a class="header-anchor" href="#条件查询" aria-label="Permalink to “条件查询”">​</a></h2><p>比如：查询 price &gt; xx 并且 pname包含华为的产品信息</p><p>用SQL查:</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>select * from tbl_product where price&gt; 500 and pname like &#39;%华为%&#39;</span></span></code></pre></div><p>用MybatisPlus查:</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>//导入mapper</span></span>
<span class="line"><span> @Autowired</span></span>
<span class="line"><span> private ProductMapper productMapper;</span></span>
<span class="line"><span>//先模拟接收前端参数</span></span>
<span class="line"><span>String pname = “华为”;</span></span>
<span class="line"><span>Double price = 500;</span></span>
<span class="line"><span>//创建条件对象</span></span>
<span class="line"><span>QueryWrapper&lt;实体类名&gt; queryWrapper = new QueryWrapper&lt;&gt;();</span></span>
<span class="line"><span>//拼条件,前面是数据库的名字，后面是对比的值</span></span>
<span class="line"><span>queryWrapper.gt(&quot;price&quot;,price);</span></span>
<span class="line"><span>//and pname like &#39;%华为%&#39;</span></span>
<span class="line"><span>queryWrapper.like(&quot;pname&quot;,pname);</span></span>
<span class="line"><span>List&lt;接收的实体类名&gt; list = productMapper.selectList(queryWrapper);</span></span>
<span class="line"><span>list.forEach(System.out::println);</span></span></code></pre></div><p>如果前端传了空值，我们这边就会查询失败，所以要加个判断</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>//导入mapper</span></span>
<span class="line"><span> @Autowired</span></span>
<span class="line"><span> private ProductMapper productMapper;</span></span>
<span class="line"><span>//先模拟接收前端参数</span></span>
<span class="line"><span>String pname = “华为”;</span></span>
<span class="line"><span>Double price = 500;</span></span>
<span class="line"><span>//创建条件对象</span></span>
<span class="line"><span>QueryWrapper&lt;实体类名&gt; queryWrapper = new QueryWrapper&lt;&gt;();</span></span>
<span class="line"><span>//拼条件,前面是数据库的名字，后面是对比的值</span></span>
<span class="line"><span>if(price!=null){</span></span>
<span class="line"><span> queryWrapper.gt(&quot;price&quot;,price);   </span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>//and pname like &#39;%华为%&#39;</span></span>
<span class="line"><span>if(StrUtil.isNotEmpty(pname)){</span></span>
<span class="line"><span>    queryWrapper.like(&quot;pname&quot;,pname);</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>List&lt;接收的实体类名&gt; list = productMapper.selectList(queryWrapper);</span></span>
<span class="line"><span>list.forEach(System.out::println);</span></span></code></pre></div><h3 id="问题-一两个参数判断还行-如果参数多了-有什么校验的好办法吗" tabindex="-1">问题：一两个参数判断还行，如果参数多了，有什么校验的好办法吗？ <a class="header-anchor" href="#问题-一两个参数判断还行-如果参数多了-有什么校验的好办法吗" aria-label="Permalink to “问题：一两个参数判断还行，如果参数多了，有什么校验的好办法吗？”">​</a></h3><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>//导入mapper</span></span>
<span class="line"><span>@Autowired</span></span>
<span class="line"><span>private ProductMapper productMapper;</span></span>
<span class="line"><span>//先模拟接收前端参数</span></span>
<span class="line"><span>String pname = “华为”;</span></span>
<span class="line"><span>Double price = 500;</span></span>
<span class="line"><span>//创建条件对象</span></span>
<span class="line"><span>QueryWrapper&lt;实体类名&gt; queryWrapper = new QueryWrapper&lt;&gt;();</span></span>
<span class="line"><span>//拼条件,前面是校验判断，中间是数据库的值，后面是对比的值</span></span>
<span class="line"><span>queryWrapper.gt(price!=null, &quot;price&quot;,price);</span></span>
<span class="line"><span>//and pname like &#39;%华为%&#39; 这里同样</span></span>
<span class="line"><span>queryWrapper.like(StrUtil.isNotEmpty(pname),&quot;pname&quot;,pname);</span></span>
<span class="line"><span>List&lt;接收的实体类名&gt; list = productMapper.selectList(queryWrapper);</span></span>
<span class="line"><span>list.forEach(System.out::println);</span></span></code></pre></div><h3 id="问题-如果中间我输入数据库的名字输入错了-或者以后修改了数据库的字段-这边就识别不到了-有什么办法解决" tabindex="-1">问题：如果中间我输入数据库的名字输入错了，或者以后修改了数据库的字段，这边就识别不到了，有什么办法解决？ <a class="header-anchor" href="#问题-如果中间我输入数据库的名字输入错了-或者以后修改了数据库的字段-这边就识别不到了-有什么办法解决" aria-label="Permalink to “问题：如果中间我输入数据库的名字输入错了，或者以后修改了数据库的字段，这边就识别不到了，有什么办法解决？”">​</a></h3><p>我们之前是用QueryWrapper来创建对象，这边还支持LambdaQueryWrapper</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>@Test</span></span>
<span class="line"><span>public void test03() throws Exception {</span></span>
<span class="line"><span>    // 模拟接收前端参数</span></span>
<span class="line"><span>    String pname = &quot;华为&quot;;</span></span>
<span class="line"><span>    Double price = 500d;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // 创建条件对象</span></span>
<span class="line"><span>    LambdaQueryWrapper&lt;Product&gt; lambdaQueryWrapper = new LambdaQueryWrapper&lt;&gt;();</span></span>
<span class="line"><span>    // price &gt; 500  这里的话我们就可以直接通过解析实体类属性来传入参数</span></span>
<span class="line"><span>    lambdaQueryWrapper.gt(price!=null,Product::getPrice,price);</span></span>
<span class="line"><span>    // and pname like &#39;%华为%&#39; 前后都加     likeLeft(&quot;%xx&quot;)左开头   likeRight(&quot;xx%&quot;)右结尾</span></span>
<span class="line"><span>    lambdaQueryWrapper.like(StrUtil.isNotEmpty(pname),Product::getPname,pname);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    List&lt;Product&gt; list = productMapper.selectList(lambdaQueryWrapper);</span></span>
<span class="line"><span>    list.forEach(System.out::println);</span></span>
<span class="line"><span>}</span></span></code></pre></div><h3 id="问题-怎么优化提升" tabindex="-1">问题：怎么优化提升？ <a class="header-anchor" href="#问题-怎么优化提升" aria-label="Permalink to “问题：怎么优化提升？”">​</a></h3><p>我们可以使用链式编程</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>// 条件查询 select * from tbl_product where price&gt; 500 and pname like &#39;%华为%&#39;</span></span>
<span class="line"><span>@Test</span></span>
<span class="line"><span>public void test04() throws Exception {</span></span>
<span class="line"><span>    // 模拟接收前端参数</span></span>
<span class="line"><span>    String pname = &quot;华为&quot;;</span></span>
<span class="line"><span>    Double price = 500d;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // 创建条件对象</span></span>
<span class="line"><span>    LambdaQueryWrapper&lt;Product&gt; lambdaQueryWrapper = new LambdaQueryWrapper&lt;&gt;();</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // 链式编程</span></span>
<span class="line"><span>    lambdaQueryWrapper</span></span>
<span class="line"><span>        .gt(price!=null,Product::getPrice,price) // price &gt; 500</span></span>
<span class="line"><span>        .like(StrUtil.isNotEmpty(pname),Product::getPname,pname); // and pname like &#39;%华为%&#39; </span></span>
<span class="line"><span></span></span>
<span class="line"><span>    List&lt;Product&gt; list = productMapper.selectList(lambdaQueryWrapper);</span></span>
<span class="line"><span>    list.forEach(System.out::println);</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>链式编程查询案例： 查询商品信息，查询条件库存 num &gt; 25 或者 price &gt; 3000 ，只展示 id、pname、price、num 字段</p><p>Mysql语法：</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>// 设置查询字段   select id,pname,price,num from tbl_product where num &gt; 25 or price &gt; 3000</span></span></code></pre></div><p>用MybatisPlus查:</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>@Test</span></span>
<span class="line"><span>public void test05() throws Exception {</span></span>
<span class="line"><span>    // 构建条件对象</span></span>
<span class="line"><span>    LambdaQueryWrapper&lt;Product&gt; lambdaQueryWrapper = new LambdaQueryWrapper&lt;&gt;();</span></span>
<span class="line"><span>    // select id,pname,price,num  （只查询四个字段）</span></span>
<span class="line"><span>    lambdaQueryWrapper.select(Product::getId,Product::getPname,Product::getPrice,Product::getNum);</span></span>
<span class="line"><span>    // 链式编程</span></span>
<span class="line"><span>    lambdaQueryWrapper.gt(Product::getNum,25) // num &gt; 25</span></span>
<span class="line"><span>        .or()</span></span>
<span class="line"><span>        .gt(Product::getPrice,3000); // or price &gt; 3000</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    List&lt;Product&gt; list = productMapper.selectList(lambdaQueryWrapper);</span></span>
<span class="line"><span>    list.forEach(System.out::println);</span></span>
<span class="line"><span>}</span></span></code></pre></div><h3 id="问题-什么情况下用lambdaquerywrapper-什么情况下用querywrapper" tabindex="-1">问题：什么情况下用lambdaQueryWrapper，什么情况下用QueryWrapper？ <a class="header-anchor" href="#问题-什么情况下用lambdaquerywrapper-什么情况下用querywrapper" aria-label="Permalink to “问题：什么情况下用lambdaQueryWrapper，什么情况下用QueryWrapper？”">​</a></h3><p>如果有实体类来接收，就可以用lambdaQueryWrapper，如果没有实体类接收，就需要用到QueryWrapper<br> 案例：查询价格 &gt; 3000 的商品信息，展示每个品牌以及对应的库存，根据库存降序展示 mysql查询:</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>select brand, sum(num) as num from tbl_product </span></span>
<span class="line"><span>	where price &gt; 3000</span></span>
<span class="line"><span>	group by brand </span></span>
<span class="line"><span>	order by num desc</span></span></code></pre></div><p>MybatisPlus查询：</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>// 分组、聚合、排序</span></span>
<span class="line"><span>    public void test06()throws Exception{</span></span>
<span class="line"><span>        // 创建条件对象（这里就不能使用lambda）</span></span>
<span class="line"><span>        QueryWrapper&lt;Product&gt; queryWrapper = new QueryWrapper&lt;&gt;();</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        // 链式编程</span></span>
<span class="line"><span>        queryWrapper</span></span>
<span class="line"><span>                .select(&quot;brand&quot;,&quot;sum(num) as num&quot;) // select brand, sum(num) as num</span></span>
<span class="line"><span>                .gt(&quot;price&quot;,3000d) //  where price &gt; 3000</span></span>
<span class="line"><span>                .groupBy(&quot;brand&quot;) //  group by brand</span></span>
<span class="line"><span>                .orderByDesc(&quot;num&quot;); //  order by num desc</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        // 执行查询  因为返回结果没有实体类接收，所以这里用map接收</span></span>
<span class="line"><span>        List&lt;Map&lt;String, Object&gt;&gt; list = productMapper.selectMaps(queryWrapper);</span></span>
<span class="line"><span>        list.forEach(System.out::println);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    }</span></span></code></pre></div><h2 id="条件修改" tabindex="-1">条件修改 <a class="header-anchor" href="#条件修改" aria-label="Permalink to “条件修改”">​</a></h2><p>需求：将小米10S手机价格设置为3999</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>update tbl_product set price = 3999 where pname = &quot;小米10S&quot;</span></span></code></pre></div><p>用MybatisPlus修改：</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>public void test07()throws Exception{</span></span>
<span class="line"><span>    // 条件对象</span><span>  // where pname = &quot;小米10S&quot;</span></span>
<span class="line"><span>    UpdateWrapper&lt;Product&gt; updateWrapper = new UpdateWrapper&lt;&gt;();</span></span>
<span class="line"><span>    updateWrapper.eq(&quot;pname&quot;,&quot;小米10S&quot;);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // 实体对象  set price = 3999</span></span>
<span class="line"><span>    Product product = new Product();</span></span>
<span class="line"><span>    product.setPrice(3999d); // 在实体类这里修改</span></span>
<span class="line"><span>	//把修改的值和条件传进去</span></span>
<span class="line"><span>    productMapper.update(product,updateWrapper);</span></span>
<span class="line"><span>}</span></span></code></pre></div><h2 id="条件删除" tabindex="-1">条件删除 <a class="header-anchor" href="#条件删除" aria-label="Permalink to “条件删除”">​</a></h2><p>删除OPPO手机<br> 用mysql删除：</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>DELETE FROM tbl_product WHERE pname = &quot;OPPO K9&quot;;</span></span></code></pre></div><p>MybatisPlus删除:</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>@Test</span></span>
<span class="line"><span>public void test08()throws Exception{</span></span>
<span class="line"><span>    // 条件对象</span></span>
<span class="line"><span>    QueryWrapper&lt;Product&gt; queryWrapper = new QueryWrapper&lt;&gt;();</span></span>
<span class="line"><span>    queryWrapper.eq(&quot;pname&quot;,&quot;OPPO K9&quot;);</span></span>
<span class="line"><span>    productMapper.delete(queryWrapper);</span></span>
<span class="line"><span>}</span></span></code></pre></div><h3 id="问题-之前都是用pagehelper分页-mybatisplus有分页插件吗" tabindex="-1">问题：之前都是用PageHelper分页，MybatisPlus有分页插件吗？ <a class="header-anchor" href="#问题-之前都是用pagehelper分页-mybatisplus有分页插件吗" aria-label="Permalink to “问题：之前都是用PageHelper分页，MybatisPlus有分页插件吗？”">​</a></h3><p>MybatisPlus内置了专门用于分页的插件 首先添加配置类：</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>// MP配置类</span></span>
<span class="line"><span>@Configuration</span></span>
<span class="line"><span>public class MybatisPlusConfig {</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>     // MyBatisPlust拦截器配置</span></span>
<span class="line"><span>    @Bean</span></span>
<span class="line"><span>    public MybatisPlusInterceptor mybatisPlusInterceptor() {</span></span>
<span class="line"><span>        MybatisPlusInterceptor interceptor = new MybatisPlusInterceptor();</span></span>
<span class="line"><span>        // 添加分页插件拦截器</span></span>
<span class="line"><span>        interceptor.addInnerInterceptor(new PaginationInnerInterceptor(DbType.MYSQL));</span></span>
<span class="line"><span>        return interceptor;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>}</span></span></code></pre></div><p>普通分页查询：</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>@Autowired</span></span>
<span class="line"><span> private ProductService productService;</span></span>
<span class="line"><span></span></span>
<span class="line"><span> // 分页查询  select * from tbl_product  limit 0 ,5</span></span>
<span class="line"><span> @Test</span></span>
<span class="line"><span> public void test01() throws Exception {</span></span>
<span class="line"><span>     // 前端提供：当前页、每页个数</span></span>
<span class="line"><span>     Page&lt;Product&gt; page = new Page&lt;&gt;(1, 5);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>     // 执行分页查询（page是引用数据类型对象，不指定返回值结果还是封装到了page中）</span></span>
<span class="line"><span>     productService.page(page);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>     // 取出结果</span></span>
<span class="line"><span>     System.out.println(page.getTotal()); // 总记录数</span></span>
<span class="line"><span>     System.out.println(page.getRecords()); // 当前页集合</span></span>
<span class="line"><span></span></span>
<span class="line"><span> }</span></span></code></pre></div><p>条件分页查询：</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>// 条件分页查询  select * from tbl_product where price &gt; 1500 limit 0 ,5</span></span>
<span class="line"><span>@Test</span></span>
<span class="line"><span>public void test02() throws Exception {</span></span>
<span class="line"><span>    // 前端提供：当前页、每页个数</span></span>
<span class="line"><span>    Page&lt;Product&gt; page = new Page&lt;&gt;(1, 5);</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // 条件对象</span></span>
<span class="line"><span>    LambdaQueryWrapper&lt;Product&gt; queryWrapper = new LambdaQueryWrapper&lt;&gt;();</span></span>
<span class="line"><span>    queryWrapper.gt(Product::getPrice,1500d);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // 执行分页查询（page是引用数据类型对象，不指定返回值结果还是封装到了page中）</span></span>
<span class="line"><span>    productService.page(page,queryWrapper);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // 取出结果</span></span>
<span class="line"><span>    System.out.println(page.getTotal()); // 总记录数</span></span>
<span class="line"><span>    System.out.println(page.getRecords()); // 当前页集合</span></span>
<span class="line"><span></span></span>
<span class="line"><span>}</span></span></code></pre></div><h3 id="问题-数据删除后就没有了-如果年底要统计数据-怎么办" tabindex="-1">问题：数据删除后就没有了，如果年底要统计数据，怎么办？ <a class="header-anchor" href="#问题-数据删除后就没有了-如果年底要统计数据-怎么办" aria-label="Permalink to “问题：数据删除后就没有了，如果年底要统计数据，怎么办？”">​</a></h3><p>我们可以逻辑删除，就是把数据设置一个状态，状态为1就存在，状态为0就是删除了，</p><p>先在数据表中添加属性deleted，然后在实体类中设置deleted，然后在这个属性上面标记为逻辑删除字段，通过 @TableLogic 注解标识这是逻辑删除字段，</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>@TableLogic</span></span>
<span class="line"><span>private Integer deleted;</span></span></code></pre></div><p>全局配置逻辑删除 @TableLogic 只是单个表设置逻辑删除字段，如果多张表都需要配置逻辑删除，则可以做全局配置</p><p>这样只要有deleted属性都被认为是做逻辑删除</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>mybatis-plus:</span></span>
<span class="line"><span>  global-config:</span></span>
<span class="line"><span>    db-config:</span></span>
<span class="line"><span>      logic-delete-field: deleted # 全局逻辑删除的实体字段名</span></span>
<span class="line"><span>      logic-delete-value: 1 # 逻辑已删除值(默认为 1)</span></span>
<span class="line"><span>      logic-not-delete-value: 0 # 逻辑未删除值(默认为 0)</span></span></code></pre></div><h2 id="service接口" tabindex="-1">Service接口 <a class="header-anchor" href="#service接口" aria-label="Permalink to “Service接口”">​</a></h2><p>为了简化service代码编写，mybatisPlus提供了通用 Service CRUD 封装IService接口 进一步封装 CRUD 采用 get 查询单行 remove 删除 list 查询集合 page 分页 前缀命名方式区分 Mapper 层避免混淆</p><table tabindex="0"><thead><tr><th style="text-align:left;">分类</th><th style="text-align:left;">方法</th><th style="text-align:left;">描述</th></tr></thead><tbody><tr><td style="text-align:left;">新增</td><td style="text-align:left;"><code>boolean save(T entity)</code></td><td style="text-align:left;">新增，entity 实体对象</td></tr><tr><td style="text-align:left;"></td><td style="text-align:left;"><code>boolean saveOrUpdate(T entity)</code></td><td style="text-align:left;">id存在则更新记录，否则插入一条记录</td></tr><tr><td style="text-align:left;"></td><td style="text-align:left;"><code>boolean saveBatch(Collection&lt;T&gt; entityList)</code></td><td style="text-align:left;">插入（批量），默认一次可以保存1000条数据</td></tr><tr><td style="text-align:left;">修改</td><td style="text-align:left;"><code>boolean updateById(T entity)</code></td><td style="text-align:left;">根据 ID 修改</td></tr><tr><td style="text-align:left;"></td><td style="text-align:left;"><code>boolean update(T entity, Wrapper updateWrapper)</code></td><td style="text-align:left;">根据条件修改</td></tr><tr><td style="text-align:left;">查询</td><td style="text-align:left;"><code>T getById(Serializable id)</code></td><td style="text-align:left;">根据 ID 查询</td></tr><tr><td style="text-align:left;"></td><td style="text-align:left;"><code>List&lt;T&gt; listByIds(Collection&lt;? extends Serializable&gt; idList)</code></td><td style="text-align:left;">查询（根据ID 批量查询）</td></tr><tr><td style="text-align:left;"></td><td style="text-align:left;"><code>List&lt;T&gt; list()</code></td><td style="text-align:left;">查询所有</td></tr><tr><td style="text-align:left;"></td><td style="text-align:left;"><code>List&lt;T&gt; list(Wrapper&lt;T&gt; queryWrapper)</code></td><td style="text-align:left;">条件查询</td></tr><tr><td style="text-align:left;">删除</td><td style="text-align:left;"><code>boolean removeById(Serializable id)</code></td><td style="text-align:left;">根据 ID 删除</td></tr><tr><td style="text-align:left;"></td><td style="text-align:left;"><code>boolean removeByIds(Collection&lt;? extends Serializable&gt; idList)</code></td><td style="text-align:left;">删除（根据ID 批量删除）</td></tr><tr><td style="text-align:left;"></td><td style="text-align:left;"><code>boolean remove(Wrapper&lt;T&gt; queryWrapper)</code></td><td style="text-align:left;">根据条件删除</td></tr></tbody></table><h3 id="改造service" tabindex="-1">改造Service <a class="header-anchor" href="#改造service" aria-label="Permalink to “改造Service”">​</a></h3><p>使用Service 接口使用</p><ul><li>接口继承 IService</li><li>实现类继承 ServiceImpl&lt;M,T&gt;</li></ul><p>Service 接口 继承 IService 接口，泛型 T 是实体类类型，M是DAO接口</p><h3 id="问题-每次创建用户-都要设置创建时间-修改时间-怎么才能不用每次设置" tabindex="-1">问题：每次创建用户，都要设置创建时间，修改时间，怎么才能不用每次设置？ <a class="header-anchor" href="#问题-每次创建用户-都要设置创建时间-修改时间-怎么才能不用每次设置" aria-label="Permalink to “问题：每次创建用户，都要设置创建时间，修改时间，怎么才能不用每次设置？”">​</a></h3><table tabindex="0"><thead><tr><th style="text-align:left;">值</th><th style="text-align:left;">描述</th></tr></thead><tbody><tr><td style="text-align:left;">DEFAULT</td><td style="text-align:left;">默认不处理</td></tr><tr><td style="text-align:left;">INSERT</td><td style="text-align:left;">插入时填充字段</td></tr><tr><td style="text-align:left;">UPDATE</td><td style="text-align:left;">更新时填充字段</td></tr><tr><td style="text-align:left;">INSERT_UPDATE</td><td style="text-align:left;">插入和更新时填充字段</td></tr></tbody></table><p>在实体类中字段上面设置</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>@TableField(fill = FieldFill.INSERT)</span></span>
<span class="line"><span>private Date createTime;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>@TableField(fill = FieldFill.INSERT_UPDATE)</span></span>
<span class="line"><span>private Date lastUpdateTime;****</span></span></code></pre></div><p>配置类设置填充值</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>@Slf4j</span></span>
<span class="line"><span>@Component</span></span>
<span class="line"><span>public class MyMetaObjectHandler implements MetaObjectHandler {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    @Override</span></span>
<span class="line"><span>    public void insertFill(MetaObject metaObject) {</span></span>
<span class="line"><span>        log.info(&quot;start insert fill ....&quot;);</span></span>
<span class="line"><span>        this.strictInsertFill(metaObject, &quot;createTime&quot;, Date.class, new Date()); // 起始版本 3.3.0(推荐使用)</span></span>
<span class="line"><span>        this.strictInsertFill(metaObject, &quot;lastUpdateTime&quot;, Date.class, new Date()); // 起始版本 3.3.0(推荐使用)</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    @Override</span></span>
<span class="line"><span>    public void updateFill(MetaObject metaObject) {</span></span>
<span class="line"><span>        log.info(&quot;start update fill ....&quot;);</span></span>
<span class="line"><span>        this.strictUpdateFill(metaObject, &quot;lastUpdateTime&quot;, Date.class, new Date()); // 起始版本 3.3.0(推荐)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div><h2 id="分页插件" tabindex="-1">分页插件 <a class="header-anchor" href="#分页插件" aria-label="Permalink to “分页插件”">​</a></h2><p>添加分页插件拦截器</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>// MP配置类</span></span>
<span class="line"><span>@Configuration</span></span>
<span class="line"><span>public class MybatisPlusConfig {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>     // MyBatisPlust拦截器配置</span></span>
<span class="line"><span>    @Bean</span></span>
<span class="line"><span>    public MybatisPlusInterceptor mybatisPlusInterceptor() {</span></span>
<span class="line"><span>        MybatisPlusInterceptor interceptor = new MybatisPlusInterceptor();</span></span>
<span class="line"><span>        // 添加分页插件拦截器</span></span>
<span class="line"><span>        interceptor.addInnerInterceptor(new PaginationInnerInterceptor(DbType.MYSQL));</span></span>
<span class="line"><span>        return interceptor;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>测试</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>@SpringBootTest</span></span>
<span class="line"><span>public class PageTest {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    @Autowired</span></span>
<span class="line"><span>    private ProductService productService;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // 分页查询  select * from tbl_product  limit 0 ,5</span></span>
<span class="line"><span>    @Test</span></span>
<span class="line"><span>    public void test01() throws Exception {</span></span>
<span class="line"><span>        // 前端提供：当前页、每页个数</span></span>
<span class="line"><span>        Page&lt;Product&gt; page = new Page&lt;&gt;(1, 5);</span></span>
<span class="line"><span>        // 执行分页查询（page是引用数据类型对象，不指定返回值结果还是封装到了page中）</span></span>
<span class="line"><span>        productService.page(page);</span></span>
<span class="line"><span>        // 取出结果</span></span>
<span class="line"><span>        System.out.println(page.getTotal()); // 总记录数</span></span>
<span class="line"><span>        System.out.println(page.getRecords()); // 当前页集合</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // 条件分页查询  select * from tbl_product where price &gt; 1500 limit 0 ,5</span></span>
<span class="line"><span>    @Test</span></span>
<span class="line"><span>    public void test02() throws Exception {</span></span>
<span class="line"><span>        // 前端提供：当前页、每页个数</span></span>
<span class="line"><span>        Page&lt;Product&gt; page = new Page&lt;&gt;(1, 5);</span></span>
<span class="line"><span>        // 条件对象</span></span>
<span class="line"><span>        LambdaQueryWrapper&lt;Product&gt; queryWrapper = new LambdaQueryWrapper&lt;&gt;();</span></span>
<span class="line"><span>        queryWrapper.gt(Product::getPrice,1500d);</span></span>
<span class="line"><span>        // 执行分页查询（page是引用数据类型对象，不指定返回值结果还是封装到了page中）</span></span>
<span class="line"><span>        productService.page(page,queryWrapper);</span></span>
<span class="line"><span>        // 取出结果</span></span>
<span class="line"><span>        System.out.println(page.getTotal()); // 总记录数</span></span>
<span class="line"><span>        System.out.println(page.getRecords()); // 当前页集合</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div><h2 id="代码生成器" tabindex="-1">代码生成器 <a class="header-anchor" href="#代码生成器" aria-label="Permalink to “代码生成器”">​</a></h2><p>安装插件</p><blockquote><p><img src="`+t+'" alt=""></p></blockquote><p>配置数据源</p>',103)])])}const k=a(i,[["render",r]]);export{b as __pageData,k as default};
