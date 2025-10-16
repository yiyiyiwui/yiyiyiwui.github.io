import{_ as s,c as n,o as e,ah as p,ar as l,as as i,at as t,au as c,av as r,aw as o}from"./chunks/framework.kZi0S3Z0.js";const A=JSON.parse('{"title":"分布式事务","description":"","frontmatter":{"outline":"deep"},"headers":[],"relativePath":"java/dt.md","filePath":"java/dt.md"}'),d={name:"java/dt.md"};function h(u,a,g,b,f,m){return e(),n("div",null,[...a[0]||(a[0]=[p('<h1 id="分布式事务" tabindex="-1">分布式事务 <a class="header-anchor" href="#分布式事务" aria-label="Permalink to “分布式事务”">​</a></h1><blockquote><p>CAP定理、BASE理论、AC/PC模式、Seata</p></blockquote><h2 id="事务" tabindex="-1">事务 <a class="header-anchor" href="#事务" aria-label="Permalink to “事务”">​</a></h2><p>事务就是要保证一组数据库操作，要么全部成功，要么全部失败!</p><h3 id="事务的acid原则" tabindex="-1">事务的ACID原则： <a class="header-anchor" href="#事务的acid原则" aria-label="Permalink to “事务的ACID原则：”">​</a></h3><p>原子性：事务中的操作，要么全部成功，要么全部失败</p><p>一致性：事务执行前后，数据要保持一致</p><p>隔离性：多个事务之间操作互不影响</p><p>持久性：一个事务一旦提交成功，那么它对数据库的改变就是永久性的</p><p>分布式系统一致性：就是一次大的操作由不同的小操作组成，这些小的操作分布在不同的服务器上，且属于不同的应用，分布式事务需要保证这些小操作要么全部成功，要么全部失败。本质上来说，分布式事务就是为了保证不同数据库的数据一致性。</p><h3 id="什么是分布式事务" tabindex="-1">什么是分布式事务？ <a class="header-anchor" href="#什么是分布式事务" aria-label="Permalink to “什么是分布式事务？”">​</a></h3><p>分布式事务是指在分布式系统中，涉及到不同节点或者不同的数据库的操作时，需要保证这些操作可以全部提交或者全部回滚，以保障数据的一致性和完整性。</p><h3 id="分布式事务的cap定理是什么" tabindex="-1">分布式事务的CAP定理是什么？ <a class="header-anchor" href="#分布式事务的cap定理是什么" aria-label="Permalink to “分布式事务的CAP定理是什么？”">​</a></h3><p>一致性，可用性，分区容错性 这三个不能同时存在</p><p>一致性：用户访问分布式系统中的任意节点，得到的数据必须一致。可以理解为你去建设银行a存钱，去建设银行b取钱，查到的余额必须都是一样的。 可用性：用户访问集群中的任意节点，必须得到响应，而不是超时或拒绝。可以理解为你去银行b取钱，可以查，但是银行b还没有同步你在银行a存钱的信息，所以查到的数据不准确 分区容错性：分成两个来说 分区：就是说你在建设银行a存钱了，在银行b可以查到，但银行c没有同步到你存钱的消息，这样就造成了分区。 容错：在出现分区的时候，整个系统也要持续对外提供服务。可以理解为c虽然没有同步到你存钱的消息，但他银行c没有关门，还支持你查询余额，但是结果不准确</p><h3 id="为什么分区一定出现的话-一致性和可用性只能用一个" tabindex="-1">为什么分区一定出现的话，一致性和可用性只能用一个： <a class="header-anchor" href="#为什么分区一定出现的话-一致性和可用性只能用一个" aria-label="Permalink to “为什么分区一定出现的话，一致性和可用性只能用一个：”">​</a></h3><p>在项目中，查每个微服务，肯定会出现故障导致分区一定会出现，这样的话，如果我要保证可用性，就是每个银行都可以查余额，就会出现可能同步不过来导致数据不一致，自然也就做不到上面的一致性。 如果我要保持一致性，那么就要数据准确，而可用性就必须等待数据同步过来再响应。可以理解为你如果一定要在建设银行b查你存的钱，你就需要等建设银行a同步过来数据才可以。</p><h3 id="什么是base理论" tabindex="-1">什么是BASE理论？ <a class="header-anchor" href="#什么是base理论" aria-label="Permalink to “什么是BASE理论？”">​</a></h3><p>类似中庸，主要包含三个思想。</p><p>基本可用：系统出现故障时，允损失部分可用性，即保证核心可用。</p><p>软状态：在一定时间内，允许出现中间状态，比如临时的不一致状态。</p><p>最终一致性：虽然无法保持强一致性，但是在软状态结束后，最终达成数据一致。</p><h3 id="ap模式和cp模式的区别" tabindex="-1">AP模式和CP模式的区别? <a class="header-anchor" href="#ap模式和cp模式的区别" aria-label="Permalink to “AP模式和CP模式的区别?”">​</a></h3><p>ap是可用性可分区，允许最后查询结果不一致，最后采取措施恢复即可，但我还可以用。可以理解为可以取钱，但取的钱是之前余额的，而不是刚存的。</p><p>cp是一致性可分区。必须要强一致，但不一定能用。可以理解为能查出余额，但取不出钱。</p><h3 id="什么是分支业务-什么是全局事务" tabindex="-1">什么是分支业务？什么是全局事务？ <a class="header-anchor" href="#什么是分支业务-什么是全局事务" aria-label="Permalink to “什么是分支业务？什么是全局事务？”">​</a></h3><p>每个微服务都是分支业务，有关联的各个分支事务在一起称为全局事务。而我们需要控制全部业务来完成事务要么全部成功，要么全部失败，这个就叫做事务协调者。</p><h3 id="既然不能同时实现-只能实现ap或cp-那么用哪个技术来实现呢" tabindex="-1">既然不能同时实现，只能实现AP或CP，那么用哪个技术来实现呢？ <a class="header-anchor" href="#既然不能同时实现-只能实现ap或cp-那么用哪个技术来实现呢" aria-label="Permalink to “既然不能同时实现，只能实现AP或CP，那么用哪个技术来实现呢？”">​</a></h3><p><strong>Seata</strong></p><p>RM（控制微服务的分支事务）学生：用来管理分支事务</p><p>TC（事务协调者）班长：记录每个分支事务（RM）的执行情况</p><p>TM（全局事务）老师：控制事务是提交还是回滚</p><p>可以理解为三个角色：老师告诉班长，有比赛需要报名，然后班长告诉学生，有比赛需要报名，学生可以根据自身情况告诉班长，自己要不要报名，之后班长统计后告诉老师</p><h3 id="seata提供的四种分布式事务解决方案都是什么" tabindex="-1">Seata提供的四种分布式事务解决方案都是什么？ <a class="header-anchor" href="#seata提供的四种分布式事务解决方案都是什么" aria-label="Permalink to “Seata提供的四种分布式事务解决方案都是什么？”">​</a></h3><p>早期XA模式：CP，强一致性，分为两个阶段，第一阶段是由班长(TC)告诉学生(RM)可以开始考试了，然后学生告诉班长，没问题，我们开始准备，考完的就只要告诉班长考完了就可以，先不交卷子。二阶段就是班长通知学生，你们可以提交你们的卷子了。如果一阶段只要有一个学生告诉班长，我考试失败了，那么第二阶段，班长就会告诉其他学生，不用交卷子了。因为需要一致性。</p><p>SeataXA模式：CP，强一致性，也是分为两个阶段，第一阶段是老师（TM）先告诉班长要考试了，然后老师直接告诉学生(RM)可以开始考试了，之后学生考完了或者考试失败，都告诉班长(TC)。然后等老师(TM)告诉班长可以收卷子了(检查状态情况了),然后班长检查如果都考试成功，就提交，如果有考试失败，就回滚。</p><p>两个阶段，第一个阶段各自执行但不提交，把自己的执行结果上报给TC，TC记录后，第二阶段检查状态，如果都成功就提交，如果有一个失败就回滚。能够查到准确数据，但是等待期间不可用。</p><p>AT模式（默认模式）：AP，最终一致性，也就是可用性。两个阶段，和上面一样，第一阶段是老师（TM）先告诉班长要考试了，然后老师直接告诉学生(RM)可以开始考试了，学生先把自己卷子备份一份，之后学生考完了或者考试失败，都交卷子给班长(TC)，就可以离开了。最后等老师(TM)告诉班长可以收卷子了(检查状态情况了),然后班长检查如果都考试成功，就提交，然后把备份的卷子删了，如果有考试失败，就回滚。</p><p>第一阶段就是执行前拍个快照然后提交，不会占用数据库，然后TC检查是否都成功，如果成功了就删除快照即可，如果有一个失败，就回滚，把快照之前记录的再回滚到以前。能够使用，但数据不准确。（快照是一张表，Seata官方提供了）undo_log</p><p>TCC模式：非事务性数据库，比如Redis 以人工编码的模式来模拟AT <img src="'+l+`" alt=""> 模拟快照，拍快照，删快照</p><p>代码执行：接口</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>@LocalTCC</span></span>
<span class="line"><span>public interface AccountTCCService {</span></span>
<span class="line"><span>    /**</span></span>
<span class="line"><span>     *  一阶段：try 预留</span></span>
<span class="line"><span>     *  @TwoPhaseBusinessAction 定义 try confirm cancel 方法名</span></span>
<span class="line"><span>     */</span></span>
<span class="line"><span>    @TwoPhaseBusinessAction(name = &quot;deduct&quot;, commitMethod = &quot;confirm&quot;, rollbackMethod = &quot;cancel&quot;)</span></span>
<span class="line"><span>    void deduct(@BusinessActionContextParameter(paramName = &quot;userId&quot;) Integer userId,</span></span>
<span class="line"><span>                @BusinessActionContextParameter(paramName = &quot;money&quot;) Integer money);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    /**</span></span>
<span class="line"><span>     *  二阶段：confirm 提交</span></span>
<span class="line"><span>     * @param ctx 可以获得 @BusinessActionContextParameter参数和xid</span></span>
<span class="line"><span>     *</span></span>
<span class="line"><span>     */</span></span>
<span class="line"><span>    Boolean confirm(BusinessActionContext ctx);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    /**</span></span>
<span class="line"><span>     * 二阶段：cancel 回滚</span></span>
<span class="line"><span>     * @param ctx 可以获得 @BusinessActionContextParameter参数和xid</span></span>
<span class="line"><span>     *</span></span>
<span class="line"><span>     */</span></span>
<span class="line"><span>    Boolean cancel(BusinessActionContext ctx);</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>实现类：</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>@Autowired</span></span>
<span class="line"><span>private AccountMapper accountMapper;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>@Autowired</span></span>
<span class="line"><span>private AccountFreezeMapper freezeMapper;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>@Override</span></span>
<span class="line"><span>public void deduct(Integer userId, Integer money) {</span></span>
<span class="line"><span>    // 0.获取全局事务XID</span></span>
<span class="line"><span>    String xid = RootContext.getXID();</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    // 解决业务悬挂</span></span>
<span class="line"><span>    AccountFreeze freezeOld = freezeMapper.selectById(xid);</span></span>
<span class="line"><span>    if (freezeOld!=null) {</span></span>
<span class="line"><span>        return;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // 1.拍摄快照</span></span>
<span class="line"><span>    AccountFreeze freeze = new AccountFreeze();</span></span>
<span class="line"><span>    freeze.setXid(xid);</span></span>
<span class="line"><span>    freeze.setUserId(userId);</span></span>
<span class="line"><span>    freeze.setFreezeMoney(money);</span></span>
<span class="line"><span>    freeze.setState(AccountFreeze.State.TRY);</span></span>
<span class="line"><span>    freezeMapper.insert(freeze);</span></span>
<span class="line"><span>    // 2.执行业务</span></span>
<span class="line"><span>    accountMapper.deduct(userId, money);</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>@Override</span></span>
<span class="line"><span>public boolean confirm(BusinessActionContext ctx) {</span></span>
<span class="line"><span>    // 1.获取全局事务XID</span></span>
<span class="line"><span>    String xid = ctx.getXid();</span></span>
<span class="line"><span>    // 2.根据xid删除快照</span></span>
<span class="line"><span>    freezeMapper.deleteById(xid);</span></span>
<span class="line"><span>    return true;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>@Override</span></span>
<span class="line"><span>public boolean cancel(BusinessActionContext ctx) {</span></span>
<span class="line"><span>    // 1.获取全局事务XID</span></span>
<span class="line"><span>    String xid = ctx.getXid();</span></span>
<span class="line"><span>    // 2.查询快照</span></span>
<span class="line"><span>    AccountFreeze freeze = freezeMapper.selectById(xid);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // 获取全局参数</span></span>
<span class="line"><span>    Integer userId = (Integer) ctx.getActionContext(&quot;userId&quot;);</span></span>
<span class="line"><span>    Integer money = (Integer) ctx.getActionContext(&quot;money&quot;);</span></span>
<span class="line"><span>    // 解决空回滚</span></span>
<span class="line"><span>    if (freeze == null) {</span></span>
<span class="line"><span>        freeze = new AccountFreeze();</span></span>
<span class="line"><span>        freeze.setXid(xid);</span></span>
<span class="line"><span>        freeze.setUserId(userId);</span></span>
<span class="line"><span>        freeze.setFreezeMoney(0);</span></span>
<span class="line"><span>        freeze.setState(AccountFreeze.State.CANCEL);</span></span>
<span class="line"><span>        freezeMapper.insert(freeze);</span></span>
<span class="line"><span>        return true;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // 解决幂等性问题</span></span>
<span class="line"><span>    if (freeze.getState() == AccountFreeze.State.CANCEL) {</span></span>
<span class="line"><span>        return true;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // 3.修改冻结金额为0，状态为2</span></span>
<span class="line"><span>    freeze.setFreezeMoney(0);</span></span>
<span class="line"><span>    freeze.setState(AccountFreeze.State.CANCEL);</span></span>
<span class="line"><span>    freezeMapper.updateById(freeze);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // 4.恢复账户的钱</span></span>
<span class="line"><span>    accountMapper.refund(userId, money);</span></span>
<span class="line"><span>    return true;</span></span>
<span class="line"><span>}</span></span></code></pre></div><h3 id="saga模式" tabindex="-1">SAGA模式： <a class="header-anchor" href="#saga模式" aria-label="Permalink to “SAGA模式：”">​</a></h3><h4 id="xa模式优点和缺点" tabindex="-1">XA模式优点和缺点？ <a class="header-anchor" href="#xa模式优点和缺点" aria-label="Permalink to “XA模式优点和缺点？”">​</a></h4><p>优点，强一致性，实现简单，没有代码侵入。缺点是性能比较差，如果微服务1执行完了，还需要等微服务100执行完才可以提交，锁定数据库的时候别人不能用，需要等二阶段结束才释放。不涉及敏感服务，比如钱转账，不用设置成强一致性。</p><h4 id="at模式优缺点" tabindex="-1">AT模式优缺点？ <a class="header-anchor" href="#at模式优缺点" aria-label="Permalink to “AT模式优缺点？”">​</a></h4><p>假如提交后就关闭数据库了，如果数据库1执行成功了，数据库2执行失败了，就会出现短暂的数据不一致</p><h4 id="xa模式和at模式区别" tabindex="-1">XA模式和AT模式区别？ <a class="header-anchor" href="#xa模式和at模式区别" aria-label="Permalink to “XA模式和AT模式区别？”">​</a></h4><p>XA模式一阶段不提交事务，锁定资源，AT模式一阶段直接提交，不锁定资源。XA模式是强一致，而AT模式是最终一致。 <img src="`+i+'" alt=""></p><h4 id="at模式的脏写问题怎么解决" tabindex="-1">AT模式的脏写问题怎么解决？ <a class="header-anchor" href="#at模式的脏写问题怎么解决" aria-label="Permalink to “AT模式的脏写问题怎么解决？”">​</a></h4><p>AT模式脏写是说，事务1拍了快照执行后就关闭了，如果期间事务2用这个数据库事务修改删除，而事务1执行完毕后失败了，就需要回滚，又回到最开始的数据，这个时候事务2的修改删除就没用了。 可以理解为你有100元，执行业务花了10元后，拍了快照提交事务就走了，这个时候你朋友调用你的数据库，花费了10元，现在你数据库应该有80元才对，但是你执行事务最后TC检查失败，就需要回滚，恢复快照拍的数据100元！ 这个时候就会造成脏写问题。我们可以用写隔离来解决，就是说你执行业务后先不提交事务，先获取全局锁，在全局锁上面记录一下，之后提交事务，释放DB锁。等TC执行完后，才会释放全局锁。 这个时候如果你朋友用你数据库，提交事务后也需要访问全局锁，如果有占用，就会等待，等待0.3秒钟后如果还没释放，就会取消刚才所有操作，然后释放锁。</p><h4 id="rm执行成功还是失败-怎么告诉tc呢" tabindex="-1">RM执行成功还是失败，怎么告诉TC呢？ <a class="header-anchor" href="#rm执行成功还是失败-怎么告诉tc呢" aria-label="Permalink to “RM执行成功还是失败，怎么告诉TC呢？”">​</a></h4><p>TC就是Seata框架，我们都知道每个微服务都绑定了Nacos,所以这里把TC也绑定给Nacos，然后RM就可以通过Nacos来告诉TC</p><h4 id="怎么让seata连接到nacos" tabindex="-1">怎么让Seata连接到Nacos? <a class="header-anchor" href="#怎么让seata连接到nacos" aria-label="Permalink to “怎么让Seata连接到Nacos?”">​</a></h4><p>• <a href="https://seata.apache.org/" target="_blank" rel="noreferrer">下载Seata</a> 解压后在bin目录下下运行，如果运行失败的话就修改一下配置文件，把内存值调低一点。 <img src="'+t+'" alt=""> 修改配置 <img src="'+c+'" alt=""><img src="'+r+`" alt=""> 这里配置好了，我们就可以调用微服务去找Seata了，导入依赖：</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>&lt;dependency&gt;</span></span>
<span class="line"><span>    &lt;groupId&gt;com.alibaba.cloud&lt;/groupId&gt;</span></span>
<span class="line"><span>    &lt;artifactId&gt;spring-cloud-starter-alibaba-seata&lt;/artifactId&gt;</span></span>
<span class="line"><span>    &lt;exclusions&gt;</span></span>
<span class="line"><span>        &lt;!--版本较低，1.3.0，因此排除--&gt;</span></span>
<span class="line"><span>        &lt;exclusion&gt;</span></span>
<span class="line"><span>            &lt;artifactId&gt;seata-spring-boot-starter&lt;/artifactId&gt;</span></span>
<span class="line"><span>            &lt;groupId&gt;io.seata&lt;/groupId&gt;</span></span>
<span class="line"><span>        &lt;/exclusion&gt;</span></span>
<span class="line"><span>    &lt;/exclusions&gt;</span></span>
<span class="line"><span>&lt;/dependency&gt;</span></span>
<span class="line"><span>&lt;!--seata starter 采用1.4.2版本--&gt;</span></span>
<span class="line"><span>&lt;dependency&gt;</span></span>
<span class="line"><span>    &lt;groupId&gt;io.seata&lt;/groupId&gt;</span></span>
<span class="line"><span>    &lt;artifactId&gt;seata-spring-boot-starter&lt;/artifactId&gt;</span></span>
<span class="line"><span>    &lt;version&gt;1.4.2&lt;/version&gt;</span></span>
<span class="line"><span>&lt;/dependency&gt;</span></span></code></pre></div><p>然后在每个微服务中添加配置文件：</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>seata:</span></span>
<span class="line"><span>  registry: # TC服务注册中心的配置，微服务根据这些信息去注册中心获取tc服务地址</span></span>
<span class="line"><span>    # 参考tc服务自己的registry.conf中的配置</span></span>
<span class="line"><span>    type: nacos</span></span>
<span class="line"><span>    nacos: # tc</span></span>
<span class="line"><span>      server-addr: 127.0.0.1:8848</span></span>
<span class="line"><span>      namespace: &quot;&quot;</span></span>
<span class="line"><span>      group: DEFAULT_GROUP</span></span>
<span class="line"><span>      application: seata-tc-server # tc服务在nacos中的服务名称</span></span>
<span class="line"><span>      cluster: default</span></span>
<span class="line"><span>  tx-service-group: seata-demo # 事务组，根据这个获取tc服务的cluster名称</span></span>
<span class="line"><span>  service:</span></span>
<span class="line"><span>    vgroup-mapping: # 事务组与TC服务cluster的映射关系</span></span>
<span class="line"><span>      seata-demo: default</span></span></code></pre></div><p>微服务如何根据这些配置寻找TC的地址呢？ <img src="`+o+`" alt=""></p><h4 id="怎么让微服务开启xa模式" tabindex="-1">怎么让微服务开启XA模式？ <a class="header-anchor" href="#怎么让微服务开启xa模式" aria-label="Permalink to “怎么让微服务开启XA模式？”">​</a></h4><p>在配置文件中添加：</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>seata:</span></span>
<span class="line"><span>  data-source-proxy-mode: XA</span></span></code></pre></div><p>然后在入口添加全局事务注解</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0" dir="ltr"><code><span class="line"><span>@GlobalTransactional //开启全局事务</span></span></code></pre></div>`,66)])])}const x=s(d,[["render",h]]);export{A as __pageData,x as default};
