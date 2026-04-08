# 🎯 Java面试宝典

## 第一章：Java基础
### 面向对象三大特征
- **封装** 保安全（数据不乱改）：防止"脏数据"污染数据库，保证业务逻辑的严密性
- **继承** 省代码（共性不重写）：代码复用，减少重复劳动。修改父类，所有子类自动生效
- **多态** 防僵化（扩展不修改）：消除 if-else，系统扩展性极强。新增设备类型时，只需新增一个类，不需要修改核心业务代码


---
### JDK、JVM、JRE的区别？
- JDK：Java开发工具包，提供编译、调试、运行Java程序的工具
- JVM：Java虚拟机，负责将字节码转换为机器码执行，实现跨平台
- JRE：Java运行时环境，包含JVM和核心类库，只能运行不能开发
- 关系：JDK包含JRE，JRE包含JVM
---
### JVM
#### JVM包含什么？
- 类加载器：
  负责：把你的 .class 文件放进来

- 执行引擎：
  负责把你的 .class翻译成机器能听懂的指令

- 内存区域：

**堆**：存放对象实例（比如你new的对象）。这是空间最大的地方，GC主要在这里工作

**栈**：每个线程一个。存放局部变量。

**本地方法栈**：调用c++等本地接口。

**方法区**：存放类信息、常量、静态变量。

**程序计数器**：记住当前执行到哪一行，线程切换后能继续

- 垃圾回收器（ 清洁工）：
  负责盯着"堆仓库"，看到没人用的对象（废料）就把它扔掉，腾出空间

```
JVM内存结构图：
┌─────────────────────────────────────┐
│                 堆                   │  ← new出来的对象都在这
│  ┌──────────────┐  ┌─────────────┐  │
│  │   新生代      │  │   老年代    │  │
│  │ Eden|S0|S1   │  │             │  │
│  └──────────────┘  └─────────────┘  │
├─────────────────────────────────────┤
│           方法区（元空间）            │  ← 类信息、常量
├──────────────────┬──────────────────┤
│   虚拟机栈（线程A）│  虚拟机栈（线程B）│  ← 每个线程一个
├──────────────────┴──────────────────┤
│              程序计数器               │  ← 记录执行行号
└─────────────────────────────────────┘
```

---

### Java垃圾回收机制？

Java自动帮你清理没用的对象，不需要手动释放内存（像C/C++那样）

**判断是否该回收**：可达性分析（从GC Roots出发，找不到引用就回收）

**GC Roots包括**：
- 虚拟机栈中的局部变量
- 静态变量
- 常量池中的引用

**常用垃圾收集器**：
- **G1**（推荐）：均衡吞吐量和延迟，JDK9默认
- **ZGC**：超低延迟，停顿<10ms
- **ParNew+CMS**：老项目常用

---

### 双亲委派模型？

类加载时，先问上级"你有没有加载过这个类？"有了就用现成的，没有才自己加载。就像公司报销，先问上级能不能批，不行再自己处理。

**作用**：防止核心类被篡改（你自己写个java.lang.String不会生效，因为父级已经加载了）

```
用户自定义类加载 → 先问应用类加载器
应用类加载器 → 先问扩展类加载器
扩展类加载器 → 先问启动类加载器（加载JDK核心类）
                     ↓ 没有才自己加载
```

---

### String、StringBuffer、StringBuilder区别？

- String就像刻在石头上，改一次就刻一块新石头
- StringBuffer是橡皮泥，可以改，但改的时候要排队（加锁）
- StringBuilder是橡皮泥，可以改，不用排队（不加锁，更快）

---

### ==和equals的区别？
- == 比较基本数据类型是比较数值，比较引用数据类型是比较地址
- equals是比较两个对象的内容是否相等

```java
String a = new String("hello");
String b = new String("hello");

System.out.println(a == b);       // false，两个不同对象，地址不同
System.out.println(a.equals(b));  // true，内容一样

// 注意：Integer缓存坑
Integer x = 127;
Integer y = 127;
System.out.println(x == y);  // true，-128到127有缓存，是同一对象

Integer m = 128;
Integer n = 128;
System.out.println(m == n);  // false，超出缓存范围，不同对象
```

---

### 接口和抽象类的区别？
- 接口：只定义规范，没有具体的实现代码,需要类实现接口定义方法
- 抽象类：既可以包含具体方法实现，又可以包含抽象方法声明的类
  接口主要用于定义规范和实现多态性，抽象类主要用于被继承和代码复用

---

### 浅拷贝和深拷贝？
- 浅拷贝：浅拷贝是拷贝对象中的基本数据类型和对象的引用
- 深拷贝：深拷贝除了复制基本数据类型的值外，还会创建一个全新的对象，并复制包括子对象在内的所有内容

---

### 什么是内存泄漏？
- Java内存泄漏是指在程序中不再使用的对象仍然被占用内存，无法被垃圾回收器回收释放，最终导致内存资源的浪费和程序性能问题。
- 造成内存泄漏的原因：对象引用未及时释放、集合类未正确使用、资源未正确释放、循环引
- 避免泄漏：及时释放不再使用的对象和资源，正确使用集合类。

---

### 🆕 你在项目中做过JVM调优吗？
**结合DCIM项目回答：**

我们平台数据量千万级，接入100万+测点，高峰期GC频繁导致接口偶发卡顿。主要做了以下几点：

1. **堆内存调整**：根据服务器内存（32G）设置 `-Xms8g -Xmx8g`，避免动态扩容造成STW
2. **选择G1收集器**：`-XX:+UseG1GC -XX:MaxGCPauseMillis=200`，控制最大停顿在200ms内
3. **元空间限制**：`-XX:MetaspaceSize=256m -XX:MaxMetaspaceSize=512m`，防止元空间无限扩张
4. **GC日志开启**：`-Xlog:gc*` 监控GC频率和耗时，定位Full GC根因
5. **排查内存泄漏**：用Arthas的 `heapdump` 命令导出堆快照，MAT分析大对象，发现告警处理时一次性把10万条数据全部load进内存，改成分页批量处理后问题解决

## 第二章：集合

### 集合体系总览

Java的容器家族，根据不同需求选不同容器

```
Collection（集合）
├── List（有序可重复）
│   ├── ArrayList（数组，查快增删慢）
│   └── LinkedList（链表，增删快查慢）
├── Set（不可重复）
│   ├── HashSet（无序，最快）
│   ├── LinkedHashSet（按插入顺序）
│   └── TreeSet（自然排序）
└── Queue（队列）
    └── LinkedList

Map（键值对）
├── HashMap（无序，最快，不安全）
├── LinkedHashMap（按插入顺序）
├── TreeMap（按key排序）
├── HashTable（线程安全，效率低）
└── ConcurrentHashMap（线程安全，效率高）
```

---

### ArrayList和LinkedList区别？

- ArrayList像数组格子，通过编号直接找到位置（查快），但插入要把后面的格子全部移动（增删慢）
- LinkedList像链条，每个节点记着下一个在哪，插入只需要改一下指向（增删快），但找第100个要从头数（查慢）

---

### HashMap底层原理？

HashMap内部使用一个**数组来存储元素**，数组的每个元素被称为桶，默认初始容量是16。桶的数量由HashMap的容量确定，容量即数组的长度，**键是唯一的，而值可以重复**。HashMap使用键的哈希码（hash code）来确定存储位置。

如果发生了哈希碰撞，在桶上面存储的元素一样时，会生成链表，当链表长度到达8，且数组长度到达64，就会生成红黑树，如果存储的元素数量超过了容量的75%时，就会扩容，HashMap 的扩容操作会导致哈希表的大小变为原大小的两倍，并重新计算和分配元素的桶位置。

---

### ConcurrentHashMap为什么比HashMap安全？

- HashTable：多线程同时存储时，可能两个线程同时判断某个位置为空然后写进去，导致数据覆盖丢失
- ConcurrentHashMap：使用了分段锁，保证线程安全

---

### HashSet如何检查重复？
HashSet底层就是HashMap，存的是键，值是个固定的占位Object。判断重复先比hashCode（快速过滤），再用equals（精确比较）。

---
### HashSet如何检查重复？
- 使用一个新的哈希函数再计算这个哈希码
- 为哈希表分配额外的存储区域，用于存储碰撞的元素

---

## 第三章：多线程

### 创建线程的方式？

就像安排人干活，有4种方式

```java
// 方式1：继承Thread（不推荐，Java单继承限制）
class MyThread extends Thread {
    @Override
    public void run() {
        System.out.println("线程执行：" + Thread.currentThread().getName());
    }
}
new MyThread().start();

// 方式2：实现Runnable（推荐，可以继承其他类）
Thread t = new Thread(() -> {
    System.out.println("Runnable执行");
});
t.start();

// 方式3：实现Callable（有返回值）
FutureTask<String> task = new FutureTask<>(() -> {
    return "任务结果";
});
new Thread(task).start();
String result = task.get();  // 获取结果，会阻塞等待

// 方式4：线程池（最推荐）
ExecutorService pool = new ThreadPoolExecutor(
        5,                          // 1. corePoolSize (核心线程数)
        10,                         // 2. maximumPoolSize (最大线程数)
        60L,                        // 3. keepAliveTime (空闲存活时间)
        TimeUnit.SECONDS,           // 4. unit (时间单位)
        new ArrayBlockingQueue<>(100), // 5. workQueue (任务队列，这里指定容量为100)
        Executors.defaultThreadFactory(), // 6. threadFactory (线程工厂，用默认的就行)
        new ThreadPoolExecutor.AbortPolicy() // 7. handler (拒绝策略，满了怎么办)
);
        pool.submit(() -> System.out.println("线程池执行"));
        pool.shutdown();
```

---

### 线程池7个核心参数？

1. 核心线程数（corePoolSize）：核心线程数，即使空闲也不销毁
2. 最大线程数（maximumPoolSize）：最大的线程数量
3. 非核心线程等待时间（keepAliveTime）：非核心线程空闲多久后销毁
4. 时间单位（unit）：秒/分钟/小时
5. 任务队列（workQueue）：核心线程满了任务先进队列
6. 线程工厂（threadFactory）：可以给线程起名方便排查问题
7. 拒绝策略（handler）：队列满了且线程数到最大时怎么处理新的任务

---

### 线程池工作流程？

1. 有空闲（核心线程）→ 直接服务
2. 都忙 → 先等位（进队列）
3. 等位满了 → 找临时工（非核心线程）
4. 临时工也满了 → 执行拒绝策略

```
提交任务
  ↓
核心线程数未满？ → 是 → 创建核心线程执行
  ↓ 否
等待队列未满？ → 是 → 放入队列等待
  ↓ 否
线程数未到最大？ → 是 → 创建非核心线程执行
  ↓ 否
执行拒绝策略
```

---

### 线程池的拒绝策略有哪些？
1 默认策略： 抛出异常，表示拒绝处理任务

2 丢弃老任务，执行新的任务

3 直接丢弃新的任务，不做任何处理。

4 只要线程池没有关闭，就由提交任务的当前线程处理。

---
### 线程的状态？
#### 6种状态

**创建状态**：new 的时候就是创建

**就绪状态**：调用start，启动好了，变成就绪状态

**阻塞状态**：当运行的时候，调用sleep，wait或同步锁定时，线程进入阻塞状态，阻塞接触后，变成就绪状态，再等待cpu调度

**运行状态**：等待cpu调度后进入运行状态

**超时等待状态**：设置时间等待，时间到了后，线程会主动结束等待状态，继续往下执行其他操作。目的是控制线程的执行时间，避免线程一直阻塞在等待状态

**死亡状态**：执行完后变成死亡状态

#### 关键方法：
Priority：更改线程的优先级

sleep：指定正在执行的线程休眠多少毫秒

**join：插队，能够按照指定顺序执行**

isAlive：测试线程是否存活


### synchronized和Lock区别？

- synchronized：自动上锁解锁，就像自动门，进去自动锁，出来自动开
- Lock：手动上锁解锁，功能更多，但忘了解锁就死锁

---

### volatile关键字作用？

- 可见性：A改了变量，B能立刻看到最新值（不从本地缓存读）
- 禁止重排序：代码按你写的顺序执行，不乱序

---

### ThreadLocal是什么？

每个线程专属的小抽屉，线程A放进去的东西，线程B看不到，各不干扰

**主要用途**：
1. 存储当前登录用户信息（不用到处传参）
2. 数据库连接（保证同一线程用同一个连接）
3. 日期格式化对象（SimpleDateFormat非线程安全）

```java
// 项目中的用法：存储当前登录用户
public class UserContext {
    private static final ThreadLocal<Long> USER_ID = new ThreadLocal<>();

    public static void setUserId(Long userId) {
        USER_ID.set(userId);
    }

    public static Long getUserId() {
        return USER_ID.get();
    }

    public static void clear() {
        USER_ID.remove();  // 必须清理！线程池会复用线程
    }
}

// 拦截器中设置
@Component
public class AuthInterceptor implements HandlerInterceptor {
    @Override
    public boolean preHandle(HttpServletRequest request, ...) {
        String userId = request.getHeader("userId");
        UserContext.setUserId(Long.parseLong(userId));
        return true;
    }

    @Override
    public void afterCompletion(...) {
        UserContext.clear();  // 请求结束必须清理！
    }
}

// 业务代码中使用（不需要传参）
Long currentUserId = UserContext.getUserId();
```

---

### 🆕 你在项目里用过多线程吗？举个例子
**结合DCIM项目回答：**

用在两个地方：

**1. 告警消费线程池**：Kafka消费者按厂商分了8个分区，对应8个消费者线程并行消费。每个消费者内部用线程池处理业务逻辑，核心线程数设置为4，最大16，队列容量500，这样单日峰值10万条告警消息能稳定消费完。

**2. 多厂商设备数据并行对接**：平台接了10+家厂商，有些场景需要同时向多个厂商查询设备状态做汇总。用`CompletableFuture.allOf()`并行发起请求，原来串行要10秒，并行后缩短到2秒内。

```java
// 并行查询多厂商设备状态
List<CompletableFuture<DeviceStatus>> futures = factoryList.stream()
    .map(factory -> CompletableFuture.supplyAsync(
        () -> deviceService.queryStatus(factory.getId()), threadPool))
    .collect(Collectors.toList());

List<DeviceStatus> results = futures.stream()
    .map(CompletableFuture::join)
    .collect(Collectors.toList());
```

---

## 第四章：网络与Web

### TCP三次握手四次挥手？

三次握手三次握手是指在TCP协议中，当客户端和服务器建立连接时，需要经过**三次握手来确认双方都能正常通信**。

第一次握手：客户端发送消息给服务器，表示客户端请求建立连接

第二次握手：服务器端收到消息后给客户端发送条消息，表示收到了请求，并准备好建立连接

第三次握手：客户端收到服务端消息后，再回复一下，确认连接已建立

四次挥手是指当客户端和服务器关闭连接时，需要经过**四次挥手来确认双方都已经断开连接**。

第一次挥手：客户端发送消息，表示已完成数据的发送

第二次挥手：服务器接收到客户端的消息后，表示已经接收到了客户端的结束传输请求，但服务器仍将继续发送剩余数据。

第三次挥手：服务器发送消息给客户端，表示服务器已经完成数据的传输。

第四次挥手：客户端接收到服务器消息后，再发一条消息给服务器，表示已经接收到了服务器的结束传输请求，确认连接已被关闭。

---

### 过滤器和拦截器区别？
- 过滤器：大门保安，所有人都要过（Servlet级别），跨域处理、全局日志记录、防 SQL 注入/XSS 攻击、黑白名单
- 拦截器：公司前台，进了门才遇到（Spring级别），登录校验、权限控制、性能监控
---
### Cookie和Session的区别

Cokiehe和Session都是用来**存储用户状态信息**的，比如登录状态和身份验证。

Cookie： 是 web 服务器发送给浏览器的一块信息，浏览器会在本地一个文件中给 每个 web 服务器存储 cookie

Session： 是存储在 web 服务器端的 一块信息。session 对象存储特定用户会话所需的信息

cookie 存在于客户端，临时文件夹中，因为是在客户端，所以安全性差

session 存在于服务器的内存，存到服务器的内存中，安全性好


## 第五章：Spring
框架主要以ioc（控制反转）和aop（面向切面编程）为核心，极大的简化了代码
### Spring IOC是什么？


以前你要用一个对象，要自己new；用了IOC，告诉Spring我要用这个，Spring自动给你，你不用管怎么创建的

```java
// 以前：手动创建，强耦合
UserService userService = new UserServiceImpl(new UserDaoImpl(new DataSource()));

// IOC：Spring管理，松耦合
@Service
public class UserServiceImpl implements UserService {
    @Autowired  // Spring自动注入，不用自己new
    private UserDao userDao;
}

// 获取Bean的方式
@Autowired
private UserService userService;  // 最常用

@Resource(name = "userServiceImpl")  // 按名字注入
private UserService userService;
```

---

### Spring AOP是什么？

不改原来代码，在方法执行前/后/出错时插入额外逻辑。

**主要用途**：日志记录、事务管理、权限校验、接口耗时统计

```java
// 定义切面：统计所有Controller方法的执行时间
@Aspect
@Component
public class PerformanceAspect {

    // 切入点：所有Controller的所有方法
    @Pointcut("execution(* com.collection.controller.*.*(..))")
    public void controllerMethods() {}

    // 环绕通知
    @Around("controllerMethods()")
    public Object around(ProceedingJoinPoint joinPoint) throws Throwable {
        long start = System.currentTimeMillis();
        String methodName = joinPoint.getSignature().getName();

        try {
            Object result = joinPoint.proceed();  // 执行原方法
            long cost = System.currentTimeMillis() - start;
            log.info("方法[{}]执行耗时：{}ms", methodName, cost);
            return result;
        } catch (Exception e) {
            log.error("方法[{}]执行异常：{}", methodName, e.getMessage());
            throw e;
        }
    }
}

// 项目中用AOP记录告警操作日志
@Around("@annotation(com.dcim.annotation.AlarmLog)")
public Object logAlarmOperation(ProceedingJoinPoint point) throws Throwable {
    // 记录操作人、时间、操作类型
}
```

---

### SpringBean生命周期？

从实例化到销毁的整个过程

**对象实例化**：在 Spring 容器启动时，根据配置或注解，这个时候只是将对象实例化了，对象内的属性还未设置

**属性赋值**：容器会将配置的属性值或依赖注入到 Bean 实例中。这可以通过 setter 方法、字段注入或构造函数注入来完成。

**对象初始化**：在初始化前回调执行完毕后，Bean 实例处于已初始化的状态

**使用**：在这个阶段，可以进行一些自定义的初始化逻辑操作。

**销毁**：Bean 实例将被销毁，占用的资源被释放。

```java
@Component
public class MyBean implements InitializingBean, DisposableBean {

    // 1. 实例化（new对象）

    // 2. 属性注入
    @Autowired
    private UserService userService;

    // 3. 初始化前（BeanPostProcessor可以在这里修改Bean）

    // 4. 初始化
    @PostConstruct  // 推荐用这个
    public void init() {
        System.out.println("Bean初始化完成，可以做一些初始化工作");
        // 比如：连接池预热、缓存加载
    }

    @Override
    public void afterPropertiesSet() {
        // 也是初始化方法（实现InitializingBean接口）
    }

    // 5. 使用Bean（正常业务逻辑）

    // 6. 销毁
    @PreDestroy  // 推荐用这个
    public void cleanup() {
        System.out.println("Bean销毁，释放资源");
        // 比如：关闭连接、保存状态
    }
}
```
---

### Spring事务传播行为（7种）？

方法A调用方法B时，B的事务怎么处理

```java
// 最重要的两种：

// REQUIRED（默认）：有就加入，没有就新建
// 场景：大部分业务方法用这个
@Transactional(propagation = Propagation.REQUIRED)
public void saveOrder() {
    // 如果外层有事务就加入，没有就自己开启事务
}

// REQUIRES_NEW：不管外层有没有事务，我自己新开一个
// 场景：记录日志（就算外层事务回滚，日志也要保存）
@Transactional(propagation = Propagation.REQUIRES_NEW)
public void saveLog() {
    // 总是新开事务，与外层事务互不干扰
}
```

---
### 什么是事务？
事务就是"要么全做，要么全不做"

### Spring事务失效场景？
1：不是public修饰

2：非事务方法调用本类中事务方法

3：异常被捕获

4：事务传播行为错误

5：回滚异常类型不匹配

6：没有被Spring管理

```java
// 坑1：同类方法调用（最常见！）
@Service
public class OrderService {
    public void createOrder() {
        this.pay();  // 这样调用，pay的事务不生效！
    }

    @Transactional
    public void pay() { ... }
}
// 原因：@Transactional通过AOP代理实现，this调用绕过了代理
// 解决：注入自己，用代理对象调用
@Autowired
private OrderService self;  // 注入自身代理

public void createOrder() {
    self.pay();  // 通过代理调用，事务生效
}

// 坑2：异常被吃掉
@Transactional
public void save() {
    try {
        doSomething();
    } catch (Exception e) {
        log.error("出错了", e);
        // 没有重新抛出！事务不会回滚
    }
}
// 解决：catch后手动回滚或重新抛出
@Transactional(rollbackFor = Exception.class)
public void save() {
    try {
        doSomething();
    } catch (Exception e) {
        log.error("出错了", e);
        TransactionAspectSupport.currentTransactionStatus().setRollbackOnly();
        throw new RuntimeException(e);  // 重新抛出
    }
}

// 坑3：方法非public
@Transactional  // 不生效！
private void save() { ... }
// 解决：改为public

// 坑4：抛出检查异常（默认只回滚RuntimeException）
@Transactional  // 如果抛IOException，不会回滚
public void save() throws IOException { ... }
// 解决：指定rollbackFor
@Transactional(rollbackFor = Exception.class)
public void save() throws IOException { ... }
```

---

### Spring中的事务隔离级别?
当两个事务对同一个数据库的记录进行操作时，那么，他们之间的影响是怎么样的呢?这就出现了事务隔离级别的概念

读未提交 ：什么也没解决

读已提交：解决了脏读

可重复读 ：在同一个事务内，多次查询数据是一样的，没有解决幻读

串行化：所有事务按顺序依次执行

怎么解决？

用MVCC方案：多版本并发控制

---
### Spring循环依赖如何解决（三级缓存）？

需要B，B需要A，互相等对方先出生，就死锁了。Spring用"早期引用"解决：A先出生一个半成品，把半成品给B用，B完成了再回来把A补全。

1：使用 `@Lazy` 延迟注入：通过在循环依赖的 bean 上添加 `@Lazy` 注解，可以延迟注入属性，从而避免循环依赖问题。

2：使用 `@Autowired` 和构造器注入：使用构造器注入而非字段注入时，Spring 容器会在实例化 bean 时传入相应的参数，避免了属性循环依赖的问题。


```
问题：
A在创建过程中需要注入B
B在创建过程中需要注入A
→ 互相等待，死锁！

三级缓存解决：
一级缓存：完整的Bean（成品）
二级缓存：不完整的Bean（半成品，只实例化未注入）
三级缓存：Bean工厂（用于生成早期引用/代理）

流程：
1. 开始创建A，A放入三级缓存（工厂）
2. A需要注入B，开始创建B
3. B需要注入A，从三级缓存取出A的早期引用
4. B创建完成，放入一级缓存
5. A注入B完成，A移入一级缓存
```

---

### Spring的通知是什么?有哪几种类型?
Spring通知是一种面向切面编程（AOP）的概念，在不修改原有业务逻辑的情况下，能够在指定的切点上执行额外的代码逻辑。
通过使用不同类型的通知，可以实现与业务逻辑无关的功能，如日志记录、事务管理等

**前置通知**：在方法执行之前调用。

**后置通知**：在方法执行之后调用，如果方法发生异常则不会被调用。

**异常通知**：在方法发生异常时调用。

**最终通知**：在方法执行之后调用，无论方法是否正常完成都会被调用。

**环绕通知：**包含了方法执行前后的全部流程，需要手动调用目标方法。

### MyBatis #{}和${}区别？

- #{}：就像参数化查询，值会被当作参数传入，安全
- ${}：直接把字符串拼进SQL，危险，有SQL注入风险

```java
// #{}：预编译，安全（推荐）
// 生成SQL：SELECT * FROM user WHERE name = ?
@Select("SELECT * FROM user WHERE name = #{name}")
User findByName(String name);

// ${}：字符串拼接，危险
// 生成SQL：SELECT * FROM user WHERE name = '张三' OR '1'='1'
// 如果name传入 "张三' OR '1'='1"，就SQL注入了！
@Select("SELECT * FROM user WHERE name = '${name}'")
User findByName(String name);

// ${}的合理用途：动态表名（但要做白名单校验）
@Select("SELECT * FROM ${tableName} LIMIT 10")
List<Map> query(String tableName);
// 必须校验tableName是否合法！
```

---

## 第六章：数据库SQL

### sql的关键字有哪些？ 分别什么意思？

常见SQL关键字及含义：

- `SELECT`：查询数据，指定要返回的列
- `FROM`：指定查询的表
- `WHERE`：过滤条件，只返回满足条件的行
- `JOIN`：连接多张表（INNER/LEFT/RIGHT JOIN）
- `ON`：JOIN的连接条件
- `GROUP BY`：按某列分组，配合聚合函数使用
- `HAVING`：对分组结果过滤（WHERE不能用聚合函数，HAVING可以）
- `ORDER BY`：排序，ASC升序，DESC降序
- `LIMIT`：限制返回行数，常用于分页
- `INSERT INTO`：插入数据
- `UPDATE ... SET`：更新数据
- `DELETE FROM`：删除数据
- `DISTINCT`：去重
- `IN / NOT IN`：在某个集合内/外
- `LIKE`：模糊匹配，%代表任意字符
- `BETWEEN ... AND`：范围查询
- `EXISTS`：判断子查询是否返回结果
- `UNION / UNION ALL`：合并两个查询结果，UNION自动去重，UNION ALL不去重

---

### 我执行select后，sql底层做了什么？

MySQL执行一条SELECT语句，内部经历了以下步骤：

```
SELECT * FROM device_data WHERE factory_id = 1 ORDER BY create_time DESC LIMIT 10;

执行流程：
1. 连接器：验证用户名密码，检查权限，建立连接
2. 查询缓存（MySQL 8.0已移除）：8.0之前会先查缓存，命中直接返回
3. 解析器：词法分析（把SQL拆成token）+ 语法分析（检查语法是否合法）
4. 预处理器：检查表名、字段名是否存在，补全*对应的列名
5. 优化器：生成执行计划，决定：
   - 用哪个索引（如果有多个索引，选最优的）
   - JOIN顺序怎么排
   - 是否需要全表扫描
6. 执行器：按执行计划调用存储引擎的接口，逐行读数据
7. 存储引擎（InnoDB）：
   - 先查Buffer Pool（内存缓冲池）
   - 没有再读磁盘，读到Buffer Pool再返回
8. 返回结果给客户端
```

---

### 各大数据库的优缺点对比

| 数据库 | 优点 | 缺点 | 适用场景 |
|--------|------|------|---------|
| **MySQL** | 开源免费、社区庞大、易上手、InnoDB事务支持好 | 大数据量下全文检索弱、JSON支持不如PG | 互联网业务、中小型系统首选 |
| **PostgreSQL（PG）** | 标准SQL支持最完整、JSON/数组类型强、扩展性好（PostGIS地理、pgvector向量） | 配置复杂、DBA门槛高 | 复杂查询、地理信息、需要JSON文档存储场景 |
| **高斯DB（GaussDB）** | 华为出品、兼容Oracle和MySQL语法、分布式支持强、金融级可靠性 | 商业收费、生态相对封闭 | 政企、金融、电信等对国产化有要求的场景（我们DCIM项目用过PG和MySQL，电信有时要求国产化时用高斯） |
| **Oracle** | 性能强、功能最全、稳定性极高 | 授权贵、运维复杂 | 传统金融、电信核心系统 |
| **TiDB** | MySQL兼容、原生分布式、水平扩展 | 小数据量性能不如MySQL | 超大数据量、需要水平扩展场景 |

**项目经历**：我在DCIM项目里MySQL和PostgreSQL都用过。千万级测点数据主要在MySQL上用ShardingSphere分表，PG主要用在需要复杂JSON查询的设备配置数据上。

---

### sql索引都有哪些？他们分别用来做什么？哪个索引最快？

**按数据结构分**：
- **B+树索引**（最常用，MySQL InnoDB默认）：适合范围查询、等值查询、排序。叶子节点存所有数据，查询效率稳定O(log n)
- **Hash索引**：只支持等值查询，不支持范围查询。等值查询比B+树快（O(1)），但范围查询不适用
- **全文索引（Full-Text）**：专门用于全文搜索，`MATCH ... AGAINST` 语法，比LIKE '%关键词%'快很多

**按功能分**：
- **主键索引**：唯一 + 非空，InnoDB中数据按主键顺序存储（聚簇索引）
- **唯一索引**：保证列值唯一，允许NULL
- **普通索引**：最基础的索引，无唯一性约束
- **联合索引（复合索引）**：多列组合的索引，遵循最左前缀原则
- **覆盖索引**：查询的所有字段都在索引里，不用回表，速度最快

**哪个最快？** 覆盖索引+等值查询最快，因为直接在索引树上找到数据，不需要回表查主键。

---

### sql回表是什么意思？ mysql都有哪些锁？

**回表**：
InnoDB中非主键索引（二级索引）的叶子节点只存主键值，不存完整数据。当查询的字段不在索引中时，需要拿着主键值去主键索引（聚簇索引）再查一次完整数据，这个过程叫"回表"。

```sql
-- 假设name有普通索引，查询name和age
SELECT name, age FROM user WHERE name = '张三';
-- 1. 走name索引，找到主键id=100
-- 2. 拿id=100去聚簇索引再查一次（回表）才能得到age

-- 避免回表：建联合索引(name, age)，age就在索引里了，不需要回表（覆盖索引）
```

**MySQL的锁**：

按粒度分：
- **表锁**：锁整张表，开销小但并发低，MyISAM常用
- **行锁**：只锁某一行，InnoDB支持，并发高
- **间隙锁（Gap Lock）**：锁两行数据之间的"间隙"，防止幻读（可重复读级别下生效）
- **临键锁（Next-Key Lock）**：行锁+间隙锁的组合，InnoDB默认

按性质分：
- **共享锁（S锁/读锁）**：多个事务可以同时持有，`SELECT ... LOCK IN SHARE MODE`
- **排他锁（X锁/写锁）**：只有一个事务能持有，UPDATE/DELETE自动加，`SELECT ... FOR UPDATE`

按意向分：
- **意向共享锁（IS）**、**意向排他锁（IX）**：表级别的意向锁，提高加表锁的效率

---
### 索引失效场景？

建了索引但没用上

```sql
-- 1. 对索引列做运算/函数（常见坑！）
-- 错误（索引失效）
SELECT * FROM user WHERE YEAR(create_time) = 2024;
-- 正确（索引生效）
SELECT * FROM user WHERE create_time BETWEEN '2024-01-01' AND '2024-12-31';

-- 2. 模糊查询左边有%
-- 错误（索引失效）
SELECT * FROM user WHERE name LIKE '%张';
-- 正确（索引生效）
SELECT * FROM user WHERE name LIKE '张%';

-- 3. 类型不匹配（隐式转换）
-- phone字段是VARCHAR，用数字查（索引失效）
SELECT * FROM user WHERE phone = 13812345678;
-- 正确
SELECT * FROM user WHERE phone = '13812345678';

-- 4. 联合索引不符合最左前缀
-- 联合索引：(name, age, city)
SELECT * FROM user WHERE age = 25;  -- 不走索引（没有name）
SELECT * FROM user WHERE name = '张三';  -- 走索引
SELECT * FROM user WHERE name = '张三' AND age = 25;  -- 走索引

-- 5. 用OR连接非索引列
SELECT * FROM user WHERE name = '张三' OR address = '北京';
-- 如果address没有索引，整个查询都不走索引

-- 查看是否走索引：EXPLAIN
EXPLAIN SELECT * FROM user WHERE name = '张三';
-- 看type列：ref/range 走索引；ALL 全表扫描（不好）
```

---
### Mybatis执行流程？
1：加载配置文件，该配置文件包含了数据库连接信息、映射关系配置等

2：构建会话工厂，创建SqlSession 对象管理 ，SqlSession里面包含了执行 SQL语句的所有方法

3：把java的类型转换为数据库支持的类型，然后把结果映射。

4：关闭资源

---
### MyBatis动态SQL?
if、where、set、foreach、sql片段标签

### MyBatis一级缓存和二级缓存?
默认开启一级缓存，属于sqlSession的，相同的查询结果会被缓存起来，下次再执行相同的查询语句时，直接从缓存中获取，而不会再去数据库查询。

二级缓存：二级缓存是Mapper级别的缓存，它是跨越多个SqlSession对象的。查询结果会被缓存到一个共享的缓存区域中，供多个SqlSession对象共享。

配置开启：在MyBatis的配置文件中，通过cache元素来开启二级缓存

--- 
### 数据库事务ACID特性
原子性：要么全部成功，要么全部失败

隔离性：多个事务之间操作互不影响

一致性：事务执行前后的数据要保持一致

持久性：一个事务一旦提交成功，那么它对数据库的改变就是永久性的


---

### 数据库三大范式（建数据表的规则）
1：列不可再分

2：每个列都和主键有关系

3：消除依赖（用外键和其他表关联）

---
### MySQL三大日志？

- binlog：二进制日志（主从复制）
- redo log：重做日志（确保事务的持久性，如果发生故障，会把事务写到磁盘，等再次重启mysql的时候，会再次打开执行）----持久性
- undo log：撤销日志（数据回滚）----原子性

```
写数据流程：
1. 数据写入内存（Buffer Pool）
2. 写redo log（WAL预写日志，顺序写，很快）
3. 事务提交时写binlog
4. 定期把Buffer Pool的数据刷到磁盘

崩溃恢复：
重启时用redo log恢复已提交的事务
用undo log回滚未提交的事务
```
---
### SQL内连接外连接有什么差别?
**笛卡尔积**：是指通过SELECT语句获取两个或多个表的所有可能组合的结果集。

**内连接**：利用where子句对多表连接形成的笛卡尔积进行筛选，说白了**内连接就是获取两个表之间的公共部分内容。**

**左外连接**：获取左表中的全部内容

**右外连接**：获取右表的全部内容


---

### sql怎么优化？

```sql
第一步：发现慢SQL
① 开启MySQL慢查询日志，设置阈值（比如超过1秒记录）：
set global slow_query_log = ON;
set global long_query_time = 1;  -- 超过1秒的SQL记录
② 也可以在代码层面用MyBatis的日志，或者接入SkyWalking等APM工具自动捕获慢SQL并报警。
③ 我们项目里当时查询响应到8秒，是用户反馈页面加载慢，然后我去MySQL里开的慢查询日志找到问题SQL。
第二步：EXPLAIN分析执行计划
找到慢SQL后，在前面加EXPLAIN关键字执行：
EXPLAIN SELECT * FROM device_data WHERE factory_id=1 AND create_time>'2024-01-01';
重点看这几列：
•	type列：ALL是全表扫描（最差），ref/range是走了索引，const是最优；
•	key列：NULL表示没用索引，有值表示用了哪个索引；
•	rows列：预估扫描的行数，越小越好；
•	Extra列：Using filesort是排序没用索引，Using temporary是用了临时表，都是需要优化的信号。
第三步：针对性优化
•	加索引：最直接有效，但要选对字段（区分度高的字段优先）；
•	复合索引注意最左前缀，WHERE条件的字段顺序要和索引一致；
•	避免在索引列上做函数（如WHERE YEAR(create_time)=2024），改成范围查询；
•	大表深分页用WHERE id > last_id LIMIT n代替LIMIT offset, n；
•	SELECT只查需要的字段，不要SELECT *；
•	JOIN查询注意关联字段要有索引；
•	我们的方案：ShardingSphere分库分表+复合索引，8秒降到2秒以内。
好用的工具：
•	MySQL自带：EXPLAIN、慢查询日志、SHOW PROCESSLIST（看当前执行的SQL）；
•	pt-query-digest：分析慢查询日志的利器，能统计出最慢的TOP N SQL；
•	SkyWalking / Arthas：线上追踪慢SQL。
```

---

### mySQL的事务隔离级别是什么？
隔离级别，说白了就是为了解决一个核心矛盾："我想让很多人同时用数据库（高性能），但又不想让他们互相干扰（数据准确）。"

四个隔离级别，MySQL默认是可重复读（Repeatable Read）：

•	**读未提交** —— "看草稿"

场景：小王正在改一个数字，他刚敲了一个"5"，还没按保存。你凑过去一看："哦，是 5"。结果小王觉得不对，把"5"删了，改成了"8"，然后才保存。

你的体验：你看到了一个根本不存在的数字（5）。
后果：你被误导了。这就是"脏读"（读到了脏数据）。

•	**读已提交** —— "看保存后的结果"

场景：小王正在改数字，你凑过去看。系统提示："小王正在编辑，请等他保存完再看"。等小王保存后，你才看到新数字。

你的体验：你第一次看是 100。过了一会儿，小王把 100 改成了 200 并保存。你刷新一下页面，发现变成了 200。
后果：你在同一个文档里，前后两次看到的数据不一样。这就是"不可重复读"。

•	**可重复读** —— "自带时光机"（默认设置）

场景：当你打开文档的那一刻，系统给这个文档拍了一张"快照"（或者叫存档）。

你的体验：不管小王在后面怎么改、怎么保存，你看到的永远是你打开那一刻的样子。哪怕小王把整个表格都删了，你眼里它还是原来的样子，直到你关闭文档重新打开。

后果：你看到的数据非常稳定，不会变来变去。

唯一的小漏洞：虽然内容不变，但如果小王新增了一行数据，你有时候可能会突然看到多出来一行（这就是"幻读"）。

•	**串行化** —— "独占会议室"

场景：这个文档被锁死了。只要你正在看，谁也不许动，连小王也不行。必须等你关掉文档走了，小王才能上去改。

你的体验：绝对安全，绝对不会变。

后果：效率极低。大家都在排队，一个人用，其他人干瞪眼等着。

MySQL InnoDB在可重复读级别下用MVCC（多版本并发控制）解决了不可重复读，用间隙锁（Gap Lock）解决了大部分幻读问题。

--- 
### B+树的特点？
b+树是在b树上的优化，继承了b树的节点下有多个分支的优点。唯一不同的是数据存储结构，b+树的根节点存储的是键值，叶子节点存储的是数据。这样就能根据键值快速找到对应叶子节点的数据了。

---

### 🆕 ShardingSphere分库分表你们是怎么用的？

**结合DCIM项目回答：**

我们平台测点数据量千万级，且每天持续增长（设备每分钟上报数据），单表查询越来越慢，于是引入ShardingSphere做水平分表。

**分表策略**：按`factory_id`（厂商ID）+ 时间月份进行分表，比如 `device_data_0001_202405`，这样同一厂商的数据集中在少数几张表里，按时间范围查也很高效。

**分片键选择原则**：
- 选查询最频繁的过滤条件（我们90%查询都带factory_id）
- 选数据分布均匀的字段（避免热点）

**遇到的坑**：
- 跨分片的ORDER BY+LIMIT需要在每个分片执行后再合并排序，性能较差。我们的解决方案是：业务上强制要求查询时必须带factory_id，把跨分片查询变成单分片查询
- 分表后自增ID冲突问题：改用雪花算法生成全局唯一ID

**效果**：核心查询从8秒降到2秒以内，冷数据定期归档备份表后存储成本降低约40%。

---

## 第七章：Redis

### Redis数据类型及使用场景？

Redis是内存数据库，速度极快，有5种数据结构

```java
// String：键值对
redisTemplate.opsForValue().set("user:1:name", "张三", 30, TimeUnit.MINUTES);
redisTemplate.opsForValue().increment("visit:count");  // 原子自增

// Hash：存对象（比String省空间）
redisTemplate.opsForHash().put("user:1", "name", "张三");
redisTemplate.opsForHash().put("user:1", "age", "25");
Map<Object, Object> user = redisTemplate.opsForHash().entries("user:1");

// List：有序列表（消息队列/最新列表）
redisTemplate.opsForList().leftPush("messages", "消息1");  // 头部插入
redisTemplate.opsForList().rightPop("messages");            // 尾部取出

// Set：不重复集合（去重/共同好友）
redisTemplate.opsForSet().add("online:users", "user1", "user2");
Set<String> members = redisTemplate.opsForSet().members("online:users");

// ZSet：有分数的有序集合（排行榜）
redisTemplate.opsForZSet().add("alarm:priority", "alarm_001", 1.0);  // P1级
redisTemplate.opsForZSet().add("alarm:priority", "alarm_002", 2.0);  // P2级
// 按分数从低到高获取（P1优先处理）
Set<String> alarms = redisTemplate.opsForZSet().range("alarm:priority", 0, -1);
```

---

### 缓存穿透、击穿、雪崩？

- 穿透：查一个不存在的数据（黑客攻击），Redis没有就穿透去查DB，DB也没有，每次都白跑DB

**解决办法**：布隆过滤器 + 空值缓存

- 击穿：击穿是缓存过期，直接击穿

**解决办法**：分布式锁（只让一个请求去查DB）

- 雪崩：大批key同时过期，大量请求同时打DB

**解决办法**：加随机值：给每个key添加不一样的过期时间，不要让他们在同一时间过期

```java
// 穿透解决：布隆过滤器 + 空值缓存
@Service
public class UserService {
    @Autowired
    private RedisTemplate redisTemplate;
    @Autowired
    private BloomFilter<Long> bloomFilter;  // Guava布隆过滤器

    public User getUser(Long id) {
        // 1. 布隆过滤器：如果不存在，直接返回null（快速拦截非法ID）
        if (!bloomFilter.mightContain(id)) {
            return null;
        }

        // 2. 查缓存
        String cacheKey = "user:" + id;
        User user = (User) redisTemplate.opsForValue().get(cacheKey);
        if (user != null) return user;

        // 3. 查DB
        user = userMapper.selectById(id);

        // 4. 空值也缓存（防穿透），但过期时间短
        if (user == null) {
            redisTemplate.opsForValue().set(cacheKey, null, 5, TimeUnit.MINUTES);
        } else {
            redisTemplate.opsForValue().set(cacheKey, user, 30, TimeUnit.MINUTES);
        }
        return user;
    }
}

// 击穿解决：分布式锁（只让一个请求去查DB）
public User getUserWithLock(Long id) {
    String cacheKey = "user:" + id;
    User user = (User) redisTemplate.opsForValue().get(cacheKey);
    if (user != null) return user;

    // 加锁，只让一个线程去查DB
    String lockKey = "lock:user:" + id;
    Boolean locked = redisTemplate.opsForValue().setIfAbsent(lockKey, "1", 5, TimeUnit.SECONDS);
    if (Boolean.TRUE.equals(locked)) {
        try {
            user = userMapper.selectById(id);
            redisTemplate.opsForValue().set(cacheKey, user, 30, TimeUnit.MINUTES);
        } finally {
            redisTemplate.delete(lockKey);  // 释放锁
        }
    } else {
        // 等待一下重试
        Thread.sleep(100);
        return getUserWithLock(id);
    }
    return user;
}

// 雪崩解决：过期时间加随机值
long expire = 30 + new Random().nextInt(10);  // 30-40分钟随机
redisTemplate.opsForValue().set(key, value, expire, TimeUnit.MINUTES);
```
---
### 如何保证 Redis 数据与DB 一致？
**1、延时双删**

流程：

先删除缓存（防止读请求读到旧数据）。
更新数据库。
休眠 N 毫秒（比如 500ms）。
再次删除缓存（把在此期间可能产生的脏数据删掉）。


**2、异步重试（最推荐，高可用）**

流程：

更新数据库。
尝试删除 Redis。
如果删除失败（网络波动、超时），不要直接放弃。
将"删除 Key"的任务发送到消息队列（MQ）或存入数据库的"重试表"。
后台有个消费者不断监听，发现删除失败的任务，就无限重试，直到删除成功。

**3、Redis 过期删除策略**

流程：

设置过期时间
定时器每秒检查是否过期

**4、Canal + MQ（监听 Binlog）**

流程：

1.你往 MySQL 写数据。

2.MySQL 写入 Binlog。

3.Canal 模拟成 MySQL 从节点，读取 Binlog。

4.Canal 发送消息到 Kafka/RabbitMQ。

5.你的同步程序消费消息，更新 Redis。

●优点：对业务代码零侵入，解耦。

●时延：通常在毫秒级，感官上就是"实时"的。

---
### Redis分布式锁为什么用Redisson？
自己用SET NX实现分布式锁有一个核心问题：锁的过期时间怎么设置是一个难题。

设短了：业务还没执行完锁就自动过期，其他线程抢到锁，产生并发问题；

设长了：如果服务器崩溃没有执行unlock，这个锁会一直占用，其他线程等很久。

Redisson的看门狗（Watchdog）机制完美解决了这个问题：

•	获取锁后，看门狗后台线程每隔 锁TTL/3 的时间自动给锁续期；

•	只要业务还在运行（JVM没崩），锁就不会自然过期；

•	如果JVM崩了，看门狗线程也跟着死了，锁过期后自动释放，不会死锁；

•	正常执行完调unlock()显式释放，通过Lua脚本原子性判断是否是自己的锁再删除，防止误删别人的锁。

---
###  Redis的数据持久化方式？RDB和AOF的区别？
#### Redis有两种持久化方式：

**RDB（快照）：**

定期把内存数据全量写到一个.rdb文件里。优点是文件小、加载快、适合做备份；缺点是可能丢失最后一次快照之后的数据（比如每5分钟快照一次，宕机最多丢5分钟数据）。

**AOF（追加日志）：**

每次写操作都追加记录到.aof文件里。有三种刷盘策略：always（每次写立刻刷盘，最安全最慢）、everysec（每秒刷盘，最多丢1秒数据，推荐）、no（让OS决定，最快最不安全）。优点是数据安全；缺点是文件大，恢复慢。
混合持久化（Redis 4.0+推荐）：
AOF文件里先存RDB格式的全量数据，后面追加AOF格式的增量数据，兼顾安全性和恢复速度。我们生产用的这个模式。

---

### 🆕 你项目里Redis具体用在哪些地方？
**结合DCIM项目回答：**

1. **会话缓存**：存储多轮对话上下文、用户登录态，key用 `session:{sessionId}`，TTL 2小时

2. **告警消息去重**：用Redis SETNX存消息唯一ID（厂商+设备+时间+告警码），消费告警前先 `setIfAbsent` 判断，已处理则跳过，解决Kafka重复消费问题

3. **分布式锁**：告警处理时防止多个消费者同时处理同一条告警，用Redisson实现可重入锁

4. **实时设备状态缓存**：100万+测点实时状态，每次设备上报就更新Redis，前端查实时状态直接读Redis，不查DB，大幅降低数据库压力

5. **接口限流**：对部分查询接口用Redis计数器实现滑动窗口限流，防止高频查询压垮数据库

---

## 第八章：Kafka

### Kafka核心概念？

Kafka就像一个超高速传送带

- Topic：消息的分类，相当于一个队列的名字
- Partition（分区）：Topic被分成多个Partition，每个Partition是一个有序的日志文件，Kafka的高吞吐就来自于分区并行
- Broker：Kafka集群里的每一台服务器叫Broker，我们搭了3个Broker的集群；
- Producer：消息生产者，往Topic里发消息
- Consumer：消息消费者，从Topic里拉消息
- Consumer Group：消费者组,创建一个组，让多个Consumer订阅同一个topic同时消费

```
生产者发消息 → Topic → Partition0 → 消费者A
                      → Partition1 → 消费者B
                      → Partition2 → 消费者C
（3个分区对应3个消费者，并行消费，速度是单个的3倍）
```

---

### Kafka的底层逻辑是什么？为什么Kafka这么强？

Kafka高性能的核心秘密有四个：

**1. 顺序写磁盘**
Kafka的消息是追加写到日志文件末尾，磁盘顺序写速度和内存随机写差不多（约600MB/s），比随机写快100倍以上。

**2. 零拷贝（Zero Copy）**
传统数据发送：磁盘→内核缓冲区→用户空间→内核Socket缓冲区→网卡，需要4次拷贝。
Kafka用`sendfile`系统调用：磁盘→内核缓冲区→网卡，只需2次拷贝，CPU几乎不参与。

**3. 页缓存（Page Cache）**
Kafka读写都经过OS的页缓存（内存），热数据基本都在内存里，读取速度极快。

**4. 批量处理 + 消息压缩**
Producer批量打包发送（linger.ms等待时间内积攒消息），消费者批量拉取，再配合gzip/snappy压缩，网络传输量大幅减少。

**结合项目**：我们告警Topic单日峰值10万条，3台Broker集群 + 8个分区，轻松支撑，消费延迟基本控制在秒级以内。

---

### Kafka如何保证消息不丢失（项目实战）？

三道保险：生产者确认、Broker存副本、消费者手动确认

```java
// 1. 生产者配置（application.yml）
spring:
  kafka:
    producer:
      acks: all          # 所有副本确认才算发送成功
      retries: 3         # 失败重试3次
      properties:
        enable.idempotence: true  # 幂等性，防重复发送

// 2. 消费者配置
spring:
  kafka:
    consumer:
      enable-auto-commit: false  # 关闭自动提交offset
      auto-offset-reset: earliest

// 3. 消费者代码（手动提交offset）
@KafkaListener(topics = "alarm-topic", groupId = "alarm-group")
public void consumeAlarm(ConsumerRecord<String, String> record,
                          Acknowledgment acknowledgment) {
    try {
        // 业务处理
        AlarmDTO alarm = JSON.parseObject(record.value(), AlarmDTO.class);
        alarmService.processAlarm(alarm);

        // 处理成功才提交offset
        acknowledgment.acknowledge();
        log.info("告警处理成功，offset:{}", record.offset());
    } catch (Exception e) {
        log.error("告警处理失败，进入死信队列", e);
        // 不调用acknowledge，Kafka会重新投递
        // 重试N次后转入死信队列
    }
}

// 4. 死信队列处理
@KafkaListener(topics = "alarm-topic.DLT", groupId = "alarm-dlt-group")
public void handleDeadLetter(ConsumerRecord<String, String> record) {
    // 记录到数据库，人工介入处理
    deadLetterService.save(record.value());
    // 发告警通知给运维人员
    notifyService.sendDingAlert("死信队列有消息，需要人工处理！");
}
```

--- 

### Kafka如何保证消息时效性？
比如消费者积压了很多消息，放进去11:01的，11:10才消费到

**排查和解决思路：**

**1. 监控Consumer Lag**：用 `kafka-consumer-groups.sh --describe` 或Prometheus + Grafana监控每个分区的Lag（积压量），超过阈值（比如1000条）立刻报警。

**2. 扩容消费者**：增加Consumer实例数，但不能超过Partition数量（多余的Consumer会闲置）。我们按需把消费者从4个扩到8个与分区数对应。

**3. 提升消费速度**：
- 消费者内部用线程池异步处理业务逻辑，消费主线程只负责拉消息
- 批量消费（`max.poll.records` 调大）

**4. P1告警双通道保障**：对于时效性要求极高的P1级关键告警，我们设置了MQTT直连设备作为备用通道，即使Kafka积压也能实时到达。

**5. 消息设置TTL**：对时效性要求高的消息，在消息体内加入`expireTime`字段，消费时先检查是否过期，过期直接丢弃不处理，避免处理"过时"数据。

---

### Kafka的分片（分区）策略有哪些？

- **默认策略（轮询）**：消息轮流分配到各个Partition，数据均匀，适合大多数场景
- **Key哈希分区**：指定消息Key，相同Key的消息一定进同一个Partition，保证顺序消费。我们按`factory_id`做Key，同一厂商的告警按顺序处理，避免乱序
- **自定义分区器**：实现Partitioner接口，按业务逻辑分配，比如P1级告警固定分配到高优先级分区
- **随机分区**：随机选一个Partition，适合Key分布不均匀时避免热点

**我们项目的做法**：以`factory_id`为分区Key，8个Partition对应8个消费者线程并行消费，同厂商告警有序处理。

---

### Kafka如何避免重复消费（幂等性）？

就像快递签收，每个包裹有唯一单号，签过了就不签第二次

两个层面：

**生产者幂等性：**
开启 enable.idempotence=true，Kafka会给每条消息分配PID+序列号，Broker检测到重复序列号会去重，保证同一条消息只写一次。

**消费者业务幂等：**
即使Kafka保证了生产侧不重复，消费侧因为重试还是可能重复消费。所以我们在业务层用**Redis SETNX**存消息唯一ID（比如告警ID），消费前先用SETNX判断
这样即使同一条消息被投递两次，业务层也只会处理一次。

```java
@Service
public class AlarmConsumerService {
    @Autowired
    private RedisTemplate<String, String> redisTemplate;
    @Autowired
    private AlarmMapper alarmMapper;

    public void processAlarm(ConsumerRecord<String, String> record) {
        // 构建唯一消息ID（厂商ID + 设备ID + 告警时间 + 告警码）
        AlarmDTO alarm = JSON.parseObject(record.value(), AlarmDTO.class);
        String messageId = alarm.getFactoryId() + ":" +
                           alarm.getDeviceId() + ":" +
                           alarm.getAlarmTime() + ":" +
                           alarm.getAlarmCode();

        String redisKey = "alarm:processed:" + messageId;

        // Redis检查是否已处理（SETNX原子操作）
        Boolean isNew = redisTemplate.opsForValue()
                .setIfAbsent(redisKey, "1", 24, TimeUnit.HOURS);

        if (!Boolean.TRUE.equals(isNew)) {
            log.warn("重复告警，跳过处理：{}", messageId);
            return;
        }

        // 处理业务逻辑
        try {
            saveAlarm(alarm);
            notifyNetworkMonitor(alarm);
        } catch (Exception e) {
            // 处理失败，删除Redis标记，允许重试
            redisTemplate.delete(redisKey);
            throw e;
        }
    }
}
```

---

## 第九章：MQTT

### MQTT协议是什么？

**与HTTP对比**：
```
HTTP：每次请求都要建连接→发数据→关连接（开销大）
MQTT：建立长连接，随时发随时收（像保持通话中）
```

```java
// Spring Boot集成MQTT（使用EMQX作为Broker）
@Configuration
public class MqttConfig {

    @Bean
    public MqttPahoClientFactory mqttFactory() {
        DefaultMqttPahoClientFactory factory = new DefaultMqttPahoClientFactory();
        MqttConnectOptions options = new MqttConnectOptions();
        options.setServerURIs(new String[]{"tcp://emqx服务器IP:1883"});
        options.setUserName("admin");
        options.setPassword("password".toCharArray());
        options.setKeepAliveInterval(60);   // 心跳60秒
        options.setAutomaticReconnect(true); // 自动重连
        options.setCleanSession(false);      // 保持会话（断线后消息不丢）
        factory.setConnectionOptions(options);
        return factory;
    }

    // 订阅设备告警Topic
    @Bean
    public MessageProducerSupport mqttInbound(MqttPahoClientFactory factory) {
        MqttPahoMessageDrivenChannelAdapter adapter =
            new MqttPahoMessageDrivenChannelAdapter(
                "dcim-backend-" + UUID.randomUUID(),  // 唯一ClientID
                factory,
                "/factory/+/device/+/alarm"  // 订阅告警Topic，+是通配符
            );
        adapter.setQos(2);  // QoS2：恰好一次，关键告警不丢不重
        adapter.setOutputChannel(mqttInputChannel());
        return adapter;
    }
}

// 消息处理
@Component
public class MqttAlarmHandler {

    @ServiceActivator(inputChannel = "mqttInputChannel")
    public void handleAlarm(Message<String> message) {
        String topic = (String) message.getHeaders().get(MqttHeaders.RECEIVED_TOPIC);
        String payload = message.getPayload();

        // 从topic解析厂商和设备信息
        // topic格式：/factory/{factoryCode}/device/{deviceId}/alarm
        String[] parts = topic.split("/");
        String factoryCode = parts[2];
        String deviceId = parts[4];

        // 解析告警内容并处理
        AlarmDTO alarm = JSON.parseObject(payload, AlarmDTO.class);
        alarm.setFactoryCode(factoryCode);
        alarm.setDeviceId(deviceId);
        alarmService.processAlarm(alarm);
    }
}
```

---

### 解释一下 MQTT 的发布/订阅模式是如何工作的？

MQTT是经典的发布/订阅（Pub/Sub）模式，核心是一个中间人——**Broker（消息代理）**。

```
设备（Publisher）
   ↓ 发布消息到 Topic: /factory/001/device/A01/alarm
MQTT Broker（EMQX）
   ↓ 转发给所有订阅了该Topic的客户端
后台服务（Subscriber）— 订阅了 /factory/+/device/+/alarm
```

**关键点**：
- **发布者和订阅者完全解耦**，互相不知道对方存在，只通过Topic联系
- **Topic支持通配符**：`+` 匹配单层（`/factory/+/alarm` 匹配 `/factory/001/alarm`），`#` 匹配多层（`/factory/#` 匹配所有子Topic）
- **QoS三个级别**：
  - QoS 0：最多一次，可能丢消息（适合不重要的遥测数据）
  - QoS 1：至少一次，可能重复（需要业务侧幂等处理）
  - QoS 2：恰好一次，最安全但最慢（适合关键告警，我们P1告警用这个）
- **保留消息（Retain）**：Broker保存最后一条消息，新订阅者连上来立刻收到，适合设备状态同步

---

### 如果 MQTT 消息丢失或延迟，你会怎么排查？

**排查步骤**：

1. **先看Broker端**：登录EMQX管理控制台，查看Broker的订阅数、消息速率、连接数是否正常，看是否有消息积压或Broker资源耗尽（CPU/内存）

2. **看网络连接**：检查设备到Broker的连接状态，`netstat -an | grep 1883` 看TCP连接是否正常，ping延迟是否过高

3. **看客户端日志**：查看设备端和后台服务端的MQTT客户端日志，是否有连接断开、重连、发布失败的记录

4. **QoS检查**：确认使用了正确的QoS级别，QoS 0在网络抖动时会丢消息

5. **看CleanSession配置**：如果设置了`cleanSession=true`，断线重连后未接收的消息会丢失，关键场景要设为false

6. **消息补偿机制**：我们项目对告警数据设计了补偿机制——设备端也会定期通过HTTP上报最近N条告警，与平台对账，发现缺失立刻补推

---

### 如果你们的MQTT挂了怎么办？

我们设计了**双通道告警冗余方案**：

**正常情况**：设备通过MQTT推送告警 → EMQX Broker → 后台服务处理

**MQTT故障时**：
1. **Kafka作为备用通道**：厂商通过HTTP接口推送告警到我们的REST接口，我们写入Kafka，消费者照常处理。对于能走HTTP的厂商，MQTT挂了切换无感知
2. **告警补偿轮询**：对于只支持MQTT的设备，后台定时任务（XXL-JOB）每5分钟主动轮询设备网关HTTP接口拉取未接收的告警，防止漏报
3. **EMQX集群化部署**：EMQX本身搭了集群（3节点），单节点故障会自动切换，大幅降低单点故障风险
4. **监控告警**：对MQTT连接数做监控，连接数骤降触发告警，5分钟内运维介入

**结果**：系统上线后实现零漏报，多次EMQX节点维护期间均无告警丢失。

---

## 第十章：Spring Cloud微服务

### 微服务包含哪些东西？他们的作用分别是什么？

微服务不是单一技术，是一套组件体系：

| 组件 | 作用 | 常用选型 |
|------|------|---------|
| **服务注册与发现** | 服务自动注册、互相找到对方 | Nacos、Eureka |
| **API 网关** | 统一入口，鉴权/限流/路由 | Spring Cloud Gateway、Kong |
| **配置中心** | 集中管理所有服务的配置，热更新 | Nacos Config、Apollo |
| **负载均衡** | 同一服务多实例时分流请求 | Ribbon、LoadBalancer |
| **服务调用** | 服务间HTTP调用（声明式） | OpenFeign |
| **熔断降级** | 服务故障时快速失败，保护整体 | Sentinel、Hystrix |
| **链路追踪** | 追踪请求经过哪些服务、哪里慢 | SkyWalking、Zipkin |
| **消息总线** | 服务间异步通信、事件驱动 | Kafka、RabbitMQ |

**我们项目用到的**：Spring Cloud Gateway（网关）+ Nacos（注册中心+配置中心）+ OpenFeign（服务调用）+ Sentinel（熔断限流）+ Kafka（异步消息）+ Docker/Nginx（部署）

---

### 什么是服务熔断和降级？

- 熔断：像家里的断路器，电流过大就断开，保护整个电路
- 降级：降级就是"退而求其次"，主要功能不行了，给个备用方案

```java
// 使用Sentinel实现熔断降级
@SentinelResource(
    value = "getAlarmList",
    fallback = "getAlarmListFallback",     // 业务异常时的降级方法
    blockHandler = "getAlarmListBlocked"   // 被限流/熔断时的处理方法
)
public List<AlarmVO> getAlarmList(Long factoryId) {
    return alarmFeignClient.getAlarms(factoryId);
}

// 降级方法（返回兜底数据）
public List<AlarmVO> getAlarmListFallback(Long factoryId, Throwable e) {
    log.error("获取告警列表失败，返回空列表", e);
    return Collections.emptyList();  // 返回空列表，而不是报错
}

// 被限流时的处理
public List<AlarmVO> getAlarmListBlocked(Long factoryId, BlockException e) {
    log.warn("告警查询被限流");
    return Collections.emptyList();
}
```

---

### 🆕 OpenFeign是什么？怎么用？

OpenFeign是Spring Cloud的声明式HTTP客户端，让服务间调用像调用本地方法一样简单。

```java
// 1. 定义Feign接口（像写Controller一样）
@FeignClient(name = "alarm-service", fallback = AlarmClientFallback.class)
public interface AlarmFeignClient {
    
    @GetMapping("/api/alarm/list")
    List<AlarmVO> getAlarms(@RequestParam Long factoryId);
    
    @PostMapping("/api/alarm/process")
    void processAlarm(@RequestBody AlarmDTO alarm);
}

// 2. 降级类（服务不可用时的兜底）
@Component
public class AlarmClientFallback implements AlarmFeignClient {
    @Override
    public List<AlarmVO> getAlarms(Long factoryId) {
        return Collections.emptyList();  // 返回空，而不是报错
    }
}

// 3. 直接注入使用（像调本地方法一样）
@Autowired
private AlarmFeignClient alarmFeignClient;

List<AlarmVO> alarms = alarmFeignClient.getAlarms(factoryId);
```

**底层原理**：Feign通过JDK动态代理生成接口的实现类，调用时通过Ribbon从注册中心获取服务实例列表，进行负载均衡，最终用HttpClient/OkHttp发起真实HTTP请求。

---

## 第十一章：AI相关

**AI底层如何实现——从零理解**：

```
你问AI："今天天气怎么样？"

AI处理过程：
1. 分词：把你的问题切成一个个词
   ["今天", "天气", "怎么样"]

2. 向量化：把每个词转成数字（电脑能理解）
   "今天" → [0.8, -0.2, 0.5, ...]（几千个数字）

3. Transformer计算：分析词与词之间的关系
   "天气"和"怎么样"关联性强，"今天"修饰"天气"

4. 预测下一个词：根据上下文，预测最可能出现的词
   "今天天气" → 接下来最可能是"晴" or "雨" or "不太好"

5. 重复预测：一个词一个词往后生成
   "今天天气不太好，..." → 逐词生成完整回答

本质：AI不是真的理解，而是从海量文本中学到了语言规律，
能预测"什么词后面最可能跟什么词"
```

---

### AI核心名词通俗解释

#### 1. LLM（大语言模型）

读了海量书籍的超级学生，能回答各种问题
- 代表：GPT-4、Claude、DeepSeek、通义千问、文心一言
- 特点：通过训练几乎"读遍"了互联网上的文字

#### 2. Token（令牌）

AI处理文字的基本单位，中文一般1个字=1-2个Token
```
"你好世界" → ["你", "好", "世", "界"] = 4个Token
计费通常按Token数量，输入+输出一起算
```

#### 3. Prompt（提示词）

你给AI的指令，Prompt写得好，回答质量高十倍

```
差的Prompt："写个代码"
好的Prompt：
"你是一个Java高级工程师，请用Spring Boot写一个
 根据设备ID查询最近24小时告警列表的REST接口，
 要求：分页查询、按时间倒序、返回JSON格式"

技巧：
- 给AI一个角色身份
- 描述清楚任务和背景
- 指定输出格式
- 给示例
```

#### 4. Embedding（向量化）

把文字转成一串数字，让电脑能计算文字之间的相似程度
```
"苹果" → [0.8, 0.2, -0.5, ...]
"橙子" → [0.7, 0.3, -0.4, ...]  ← 和苹果相似，数字接近
"汽车" → [-0.2, 0.9, 0.8, ...]  ← 和苹果差异大，数字差异大

向量距离越近 = 语义越相似
用途：语义搜索、推荐系统、RAG
```

#### 5. RAG（检索增强生成）

AI不知道你公司内部数据，RAG先帮你查出相关资料，再喂给AI回答。就像开卷考试，AI先查笔记再答题

```
用户问："北七家机房上月电费是多少？"

没有RAG：AI说"不知道，我没有这个数据"

有RAG：
1. 向量搜索：在你的数据库里搜"北七家 上月 电费"相关数据
2. 找到相关记录：5月用电量3000度，电价0.8元/度
3. 把数据喂给AI：
   "根据以下数据回答问题：北七家5月用电量3000度，单价0.8元/度。问：上月电费多少？"
4. AI回答："北七家上月电费为2400元（3000度×0.8元/度）"
```

#### 6. Text2SQL

用自然语言查数据库，不用写SQL。你说"给我看看北七家上周的告警"，AI自动生成SQL查出来

#### 7. Function Calling（函数调用）

给AI一个工具箱，AI根据问题自动决定用哪个工具

```
工具箱里有：[查告警、查能耗、发邮件、查设备状态]

用户问："北七家今天有没有高温告警，有的话发邮件给运维负责人"

AI自动规划：
步骤1：调用"查告警"工具，条件：北七家+今天+高温
步骤2：发现有3条高温告警
步骤3：调用"发邮件"工具，收件人：运维负责人，内容：高温告警详情
```

#### 8. Agent（智能体）

能自主规划任务、使用工具、执行多步骤任务的AI

- 普通AI：你问一句，它答一句（被动）
- Agent：你说目标，它自己规划步骤，调用各种工具完成任务（主动）

```
你说："帮我分析一下上个月各机房的能耗情况，
      找出能耗最高的前3个机房，并给出节能建议"

Agent执行过程（自动规划）：
步骤1：调用查询工具，获取上月各机房能耗数据
步骤2：对数据排序，找出TOP3
步骤3：分析能耗高的原因（查设备数据）
步骤4：结合行业经验，生成节能建议
步骤5：整理报告，返回给用户
```

#### 9. Vector Database（向量数据库）

专门存储向量（数字数组）的数据库，能快速找出"最相似"的数据

- 普通数据库：精确匹配（找名字叫"张三"的人）
- 向量数据库：相似匹配（找和"张三"最像的人）

**常用向量数据库**：
| 数据库 | 特点 |
|--------|------|
| Milvus | 开源，高性能，国内用得多 |
| Pinecone | 云服务，简单易用 |
| Chroma | 轻量级，适合本地开发 |
| pgvector | PostgreSQL插件，不用单独部署 |

#### 10. Chain of Thought（思维链，CoT）

让AI"先思考再回答"，就像做数学题先列步骤再给答案，准确率更高

```
没有CoT：
问：北七家有多少台设备出现了P1告警？
AI直接回答：（可能出错）

有CoT：
问：北七家有多少台设备出现了P1告警？
   请先分析问题，再给出答案。

AI思考过程：
1. 理解问题：需要统计北七家、P1级别、告警数量
2. 确定表：查alarm表
3. 条件：factory_location='北七家' AND alarm_level=1
4. 统计：用COUNT(DISTINCT device_id)统计设备数
5. 生成SQL：SELECT COUNT(DISTINCT device_id) FROM alarm 
            WHERE factory_location='北七家' AND alarm_level=1

AI回答：需要执行以下SQL：...
（准确率显著提升）
```

---

### AI在Java项目中的搭建

#### 网络与部署环境
GPU服务器（本地部署LLM必须）：中等规模用 A100/H100，小规模用RTX 4090集群也行
内网代理（如果用外部API如OpenAI/Claude）：搭一个HTTP代理或部署在DMZ区
容器化环境：Docker + Kubernetes，用于管理所有AI服务

#### 核心技术栈清单
| 技术领域 | 核心组件/技术 | 推荐方案/工具 | 选型理由与适用场景 |
| :--- | :--- | :--- | :--- |
| 大语言模型 (LLM) | 私有化部署<br>(数据不出域) | Qwen2.5<br>GLM-4<br>LLaMA 3 | Qwen2.5：中文能力极强，代码/逻辑推理优秀，开源生态好。<br>GLM-4：长文本处理能力强，适合处理复杂企业文档。<br>LLaMA 3：全球生态最强，适合英文场景或作为基座微调。 |
| | API 调用<br>(追求最强效果) | GPT-4o / o1<br>Claude 3.5 Sonnet | GPT-4o：综合推理能力最强，适合处理高难度任务。<br>Claude 3.5：代码生成与"类人"语感极佳，适合辅助编程和写作。 |
| Embedding 模型<br>(文本向量化) | 本地部署 | BGE-M3<br>BGE-large-zh | BGE-M3：支持多语言、长文本，检索精度高，是中文场景下的首选开源模型。 |
| | API 服务 | text-embedding-3<br>(OpenAI) | text-embedding-3-large：性能稳定，无需维护模型服务，适合快速验证或非敏感数据。 |
| 向量数据库<br>(知识库存储) | 大规模/企业级 | Milvus | 专为海量数据设计，性能强悍，支持分布式部署，适合拥有百万级文档的大型企业。 |
| | 中小规模/高性能 | Qdrant | 基于 Rust 开发，资源占用低且速度快，部署简单，适合大多数中型业务场景。 |
| | 轻量级/一体化 | pgvector | 基于 PostgreSQL 插件，如果公司已有 PG 数据库，直接复用即可，运维成本最低。 |
| RAG 框架<br>(检索增强生成) | 核心编排 | LangChain<br>LlamaIndex | LangChain：生态最全，组件丰富，适合构建复杂的 Agent 应用。<br>LlamaIndex：专注于数据处理和索引，在 RAG 数据流转上更细腻。 |
| Agent 框架<br>(智能体/工具调用) | 复杂任务编排 | LangGraph<br>AutoGen | LangGraph：基于 LangChain，擅长处理有状态、多步骤的复杂工作流（如审批流）。<br>AutoGen：微软出品，擅长多智能体对话协作（如一个写代码，一个检查代码）。 |
| 推理加速框架<br>(本地 LLM 运行) | 生产环境 | vLLM | 吞吐量极高，支持连续批处理，是私有化部署大模型的首选推理引擎。 |
| | 开发/测试 | Ollama | 一键运行，极其方便，适合本地开发调试或轻量级演示。 |
| | 官方优化 | TGI<br>(HuggingFace) | 专为 Transformer 模型优化，容器化部署友好，适合 HuggingFace 生态用户。 |
| 检索优化<br>(提升准确率) | 混合检索 | BM25 + 向量 | 结合关键词匹配（BM25）和语义匹配（向量），解决专有名词（如内部项目代号）搜不到的问题。 |
| | 重排序<br>(Rerank) | BGE-Reranker<br>Cohere Rerank | 在初步检索后进行二次精细排序，能显著提升 Top-K 结果的准确性，是 RAG 系统的"点睛之笔"。 |



#### 完整落地流程（按阶段）
第一阶段：搭基础（1-2个月）
确定数据安全边界（私有化 vs API）→ 搭GPU推理服务（vLLM/Ollama）→ 部署向量数据库（Milvus）→ 搭Java网关

第二阶段：做RAG知识库（1-2个月）
收集公司内部文档（手册、FAQ、规范）→ 用Python做文档解析+分块+Embedding入库 → 搭问答界面 → 测试召回准确率

第三阶段：集成业务系统（2-3个月）
让AI能查CRM、ERP等内部数据 → 用Agent框架编排工具调用 → 通过Java业务层做权限控制（谁能查什么数据）

第四阶段：规模化+优化（持续）
微调垂直领域模型 → 添加用量监控/成本统计 → A/B测试不同LLM效果 → 搭内部Prompt管理平台

---

### AI面试常见问题

**Q1：AI大模型底层原理是什么？**
```
"大模型基于Transformer架构，
 核心是自注意力机制（Self-Attention），
 能计算一段话中每个词与其他词的关联程度。

 训练过程：
 1. 海量文本输入（互联网所有文字）
 2. 模型预测下一个词是什么
 3. 预测错了就调整参数（梯度下降）
 4. 重复几千亿次，模型就'理解'语言了

 推理过程：
 你的问题→向量化→Transformer计算→逐词生成答案"
```

**Q2：RAG和微调（Fine-tuning）有什么区别？**
```
RAG（检索增强）：
- 不改变模型本身
- 实时从知识库检索相关信息
- 知识可以随时更新
- 成本低，适合大多数业务场景

微调（Fine-tuning）：
- 用特定数据重新训练模型
- 模型本身会记住训练数据
- 更新知识需要重新训练
- 成本高，适合特定风格/领域的专业化

项目中选择RAG的原因：
我们的业务数据（设备数据、告警记录）实时变化，
用RAG可以让AI总是查到最新数据，
而微调的数据一旦固化就过时了。
```


**Q3：什么是幻觉（Hallucination）？怎么解决？**
```
AI有时候会"一本正经地胡说八道"，
       编造一些看起来合理但实际不存在的信息

原因：AI是预测下一个词，当知识不足时，
     会根据语言规律生成"听起来对"的答案

解决方案：
1. RAG：提供真实数据让AI参考（不要让它凭空想象）
2. 提示词约束：
   "如果你不知道答案，请直接说'数据中没有相关记录'，
    不要推测或编造"
3. 结构化输出+验证：要求AI返回JSON，程序验证字段合法性
4. 降低temperature（设置为0.1-0.3），让输出更保守
```

**Q4：你在项目里具体怎么把AI集成到业务系统里的？**
```
结合DCIM项目实际经历回答：

我们做了两个AI能力集成：

1. 智能告警分析：用户可以对某条告警问"这个告警是什么原因，历史上有没有类似的"
   - Java层接收请求，从DB查出该设备历史告警记录
   - 拼装成结构化数据传给AI引擎
   - AI结合历史数据和设备手册（RAG知识库）给出分析
   - Java层把AI回答存到数据库，展示给用户

2. 自然语言查询能耗（Text2SQL）：用户输入"上个月北七家机房的总电费"
   - AI把自然语言转成SQL
   - Java层执行SQL查数据库
   - 把结果返回给AI组装成自然语言回答
   - 既保证数据准确，又让交互更自然

关键设计：AI只负责理解和生成，数据查询和权限控制全在Java层做，确保安全。
```

---

## 第十二章：设计模式

### 常见设计模式？
设计模式是代码问题的经典解决方案，就像武术套路

**创建型模式（怎么创建对象）**：
- **单例模式**：全局只有一个实例，Spring中默认Bean就是单例。比如我们的MQTT连接管理器，只需要一个
- **工厂模式**：不直接new，交给工厂类创建，方便扩展。比如不同厂商设备解析器，用工厂按厂商ID创建对应解析器
- **建造者模式（Builder）**：链式调用构建复杂对象，MyBatis Plus的`LambdaQueryWrapper`就是这个思路

**结构型模式（怎么组织对象）**：
- **代理模式**：Spring AOP和`@Transactional`的底层实现，代理类在方法前后加切面逻辑
- **适配器模式**：对接10+家异构厂商设备数据时用到，把不同厂商的数据格式适配成统一格式

**行为型模式（对象怎么交互）**：
- **观察者模式**：Spring的事件机制（ApplicationEvent），告警产生时发布事件，多个监听器（通知、派单、日志）各自响应
- **策略模式**：告警分级处理，P1/P2/P3告警处理逻辑不同，用策略模式替代if-else，新增级别只加一个策略类
- **模板方法模式**：定义处理骨架，子类实现细节。比如各厂商设备的数据解析流程骨架相同（连接→认证→解析→入库），具体解析逻辑各厂商不同

```java
// 策略模式示例：告警分级处理
public interface AlarmStrategy {
    void handle(AlarmDTO alarm);
}

@Component("p1Strategy")
public class P1AlarmStrategy implements AlarmStrategy {
    @Override
    public void handle(AlarmDTO alarm) {
        // P1：实时推送网监 + 触发派单 + 短信通知
        networkMonitorService.push(alarm);
        workOrderService.create(alarm);
        smsService.sendUrgent(alarm);
    }
}

@Component("p3Strategy")
public class P3AlarmStrategy implements AlarmStrategy {
    @Override
    public void handle(AlarmDTO alarm) {
        // P3：仅页面展示，不派单不通知
        alarmPageService.display(alarm);
    }
}

// 使用：根据告警级别选择策略
Map<String, AlarmStrategy> strategies = Map.of(
    "P1", p1Strategy, "P2", p2Strategy, "P3", p3Strategy
);
strategies.get(alarm.getLevel()).handle(alarm);
```

---

## 第十三章：登录与鉴权

### JWT登录流程？
JWT就像景区门票，进门检验合法后领票，之后进每个景点刷票就行，不用每次去入口重新检验

```java
// JWT工具类
public class JwtUtil {
    private static final String SECRET = "your-secret-key-at-least-256-bits";
    private static final long EXPIRE = 30 * 60 * 1000;  // 30分钟

    // 生成Token
    public static String generateToken(Long userId, String role) {
        return Jwts.builder()
            .setSubject(String.valueOf(userId))
            .claim("role", role)
            .setIssuedAt(new Date())
            .setExpiration(new Date(System.currentTimeMillis() + EXPIRE))
            .signWith(SignatureAlgorithm.HS256, SECRET)
            .compact();
    }

    // 解析Token
    public static Claims parseToken(String token) {
        return Jwts.parser()
            .setSigningKey(SECRET)
            .parseClaimsJws(token)
            .getBody();
    }
}

// 登录接口
@PostMapping("/login")
public Result<?> login(@RequestBody LoginDTO dto) {
    // 1. 查用户
    User user = userService.findByUsername(dto.getUsername());
    // 2. 验密码
    if (!passwordEncoder.matches(dto.getPassword(), user.getPassword())) {
        return Result.fail("密码错误");
    }
    // 3. 生成Token
    String token = JwtUtil.generateToken(user.getId(), user.getRole());
    return Result.success(token);
}

// Gateway统一鉴权
@Component
public class AuthGlobalFilter implements GlobalFilter {
    @Override
    public Mono<Void> filter(ServerWebExchange exchange, GatewayFilterChain chain) {
        String token = exchange.getRequest().getHeaders().getFirst("Authorization");
        if (token == null || !token.startsWith("Bearer ")) {
            exchange.getResponse().setStatusCode(HttpStatus.UNAUTHORIZED);
            return exchange.getResponse().setComplete();
        }

        try {
            // 解析token，获取userId
            Claims claims = JwtUtil.parseToken(token.substring(7));
            String userId = claims.getSubject();

            // 把userId放到请求头，传给下游服务
            ServerHttpRequest newRequest = exchange.getRequest().mutate()
                .header("userId", userId)
                .build();
            return chain.filter(exchange.mutate().request(newRequest).build());
        } catch (Exception e) {
            exchange.getResponse().setStatusCode(HttpStatus.UNAUTHORIZED);
            return exchange.getResponse().setComplete();
        }
    }
}
```

---

## 第十四章：其他

### ES为什么这么快（什么是倒排索引）？
Es主要是提供搜索服务，数据检索。当进行关键词查询时，如果是正向索引需要扫描索引库中的所有文档，找到所有包含关键词的文档。很显然这样性能会成为问题。
而倒排索引则是根据关键词去寻找对应文档。每个关键词都对应这一系列文档，这样只要建立了该关键词的索引，就可以避免全索引库扫描的方式来进行关键词查询。
主要有两部分组成，**词条和文档**：词条列表记录了每个文档中包含哪些关键字，文档列出了所有在文档集合中出现过的关键字所对应的id

---
### ES中query和 filter 的区别？
用于检索和筛选文档的,ES中，每个文档都有一个比分值，用于衡量文档与查询的相关性或匹配程度的值，匹配度越高，排名越靠前，查询越快。

query涉及打分

filter不涉及打分

---

### 开发工作中好用的工具有哪些？比如查询慢SQL

**问题排查类**：
- **Arthas**：阿里开源的Java线上诊断工具，不重启服务即可查看方法执行耗时（`trace`命令）、实时查看类信息、热更新代码、dump堆内存。生产上排查告警处理慢，用`trace`定位到是某个厂商设备解析方法耗时3秒，针对性优化
- **SkyWalking**：分布式链路追踪，能看到一次请求经过哪些微服务、每段耗时多少，快速定位哪个服务是瓶颈
- **MySQL慢查询日志 + EXPLAIN**：找到慢SQL → EXPLAIN分析 → 针对加索引
- **pt-query-digest**：批量分析慢查询日志，找出TOP N最慢的SQL

**开发效率类**：
- **IDEA插件**：MybatisX（快速跳转Mapper和XML）、GitToolBox（行内显示git提交人）、Lombok
- **Postman / Apifox**：接口调试，Apifox还能直接生成接口文档
- **DBeaver**：多数据库客户端，支持MySQL/PG/高斯，比Navicat便宜（开源免费）
- **Redis客户端 Another Redis Desktop Manager**：可视化查看Redis数据
- **Docker Desktop**：本地快速起各种中间件（Redis、Kafka、MySQL），不用在本机安装

**运维监控类**：
- **Prometheus + Grafana**：监控服务CPU/内存/JVM/Kafka Lag，设置告警阈值
- **EMQX Dashboard**：监控MQTT连接数、消息速率、Topic订阅情况
- **Nginx日志分析**：`awk`命令统计高频接口和响应时间分布

---

### 🆕 Docker和Nginx你们是怎么用的？

**Docker的使用**：

我们所有服务都容器化部署，包括：
- 各微服务打成Docker镜像，通过`docker-compose`编排
- Redis、Kafka、EMQX等中间件也跑在Docker里，环境隔离，一键拉起
- CI/CD流程：代码提交→Jenkins自动构建→打镜像→推到私有Harbor仓库→自动部署到测试环境

```bash
# 我们项目典型的docker-compose配置片段
services:
  alarm-service:
    image: registry.内网/dcim/alarm-service:latest
    ports:
      - "8082:8082"
    environment:
      - SPRING_PROFILES_ACTIVE=prod
      - KAFKA_BOOTSTRAP_SERVERS=kafka:9092
    depends_on:
      - kafka
      - redis
```

**Nginx的使用**：

1. **反向代理**：所有外部请求先打Nginx，再转发给对应服务，隐藏内部服务端口
2. **前端静态资源**：Vue打包后的dist目录部署在Nginx，配置history路由模式
3. **负载均衡**：多个后端实例时，Nginx轮询分发请求
4. **SSL终止**：HTTPS证书在Nginx层处理，后端服务只需处理HTTP

```nginx
# 典型配置
server {
    listen 443 ssl;
    server_name dcim.内网域名.com;
    
    # 前端
    location / {
        root /var/www/dist;
        try_files $uri $uri/ /index.html;  # history路由
    }
    
    # 后端API转发
    location /api/ {
        proxy_pass http://gateway:8080;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

---

## 第十五章：项目核心问题

### ❓ 千万级数据如何存储和查询？

1.ShardingSphere做水平分表
2.建了复合索引
3.超过3个月的数据定期归档到备份表

---

### ❓ Kafka高并发告警可靠性方案？

```
三个层面保证：

 消息不丢失：
 生产者acks=all，所有副本确认才算发送成功；
 消费者手动提交offset，处理成功才确认；
 引入死信队列，重试3次失败的消息转入DLQ，
 人工介入处理，同时发送告警给异常告警页面处理。

 消息不重复：
 Redis存储消息唯一ID（厂商+设备+时间+告警码），
 消费前SETNX校验，已处理则跳过；
 数据库层加唯一索引兜底，双重保障。

 消费延迟：
 按厂商分8个分片，对应8个消费者线程；
 监控Consumer Lag，超1000条触发预警；
 P1级关键告警设置MQTT双通道备用。

 上线后实现零漏报，成功规避多起机房安全隐患。"
```

---

### ❓ 对接10+家异构厂商，数据协议不统一怎么解决？

这是项目里最有挑战的部分，用了**适配器模式 + 统一数据协议**来解决。

1. **制定统一数据标准**：定义统一的告警DTO格式（字段名、类型、枚举值），所有厂商数据最终都要转成这个格式

2. **每个厂商实现自己的适配器**：
```java
// 统一接口
public interface DeviceAdapter {
    List<AlarmDTO> parseAlarm(String rawData);
    DeviceStatus parseStatus(String rawData);
}

// 阿里云厂商适配器
@Component("aliAdapter")
public class AliDeviceAdapter implements DeviceAdapter {
    @Override
    public List<AlarmDTO> parseAlarm(String rawData) {
        // 解析阿里云格式的告警JSON，转成统一AlarmDTO
        AliAlarmRaw raw = JSON.parseObject(rawData, AliAlarmRaw.class);
        return raw.getAlarms().stream()
            .map(this::convert)
            .collect(Collectors.toList());
    }
}
```

3. **工厂模式选择适配器**：
```java
// 根据厂商ID自动选择对应适配器
@Autowired
private Map<String, DeviceAdapter> adapters;  // Spring自动注入所有实现

DeviceAdapter adapter = adapters.get(factory.getAdapterName());
List<AlarmDTO> alarms = adapter.parseAlarm(rawData);
```

4. **协议兼容**：不同厂商用MQTT、HTTP、WebSocket等不同协议，我们在接入层统一转换，业务层只处理标准化数据

**效果**：新增一家厂商，只需实现一个适配器类，不需要改核心业务代码，扩展性很好。

---

### ❓ 你做过哪些性能优化，效果怎么样？

结合项目整理了几个有数据支撑的优化：

| 问题 | 方案 | 效果 |
|------|------|------|
| 核心查询8秒 | ShardingSphere分表 + 复合索引 | 优化到2秒以内 |
| 单表数据量过大 | 历史冷数据定期归档备份表 | 存储成本降低40% |
| 多厂商串行查询慢 | CompletableFuture并行 | 10秒→2秒 |
| 100万测点实时状态查DB慢 | Redis缓存设备实时状态 | 接口响应从秒级→毫秒级 |
| 告警处理重复 | Redis SETNX幂等 + DB唯一索引 | 零重复处理 |
| 告警漏报 | Kafka+MQTT双通道+死信队列补偿 | 零漏报 |

---

### ❓ 说说你遇到过印象最深的线上问题？

**问题**：某天凌晨，运维反映告警页面显示设备状态"正常"，但现场实际有设备故障。

**排查过程**：
1. 先看Kafka Consumer Lag，发现积压了约5万条消息，消费速度明显下降
2. 用Arthas的`thread`命令看线程状态，发现消费者线程池里大量线程处于`WAITING`
3. 进一步用`thread -b`查到阻塞原因：某厂商设备解析方法里，调用外部HTTP接口（查设备信息）没有设超时时间，该厂商接口响应极慢（30秒），导致线程全部阻塞
4. 线程池满→新消息进不来→积压越来越多→页面数据不更新

**解决方案**：
- 立刻：重启消费者服务，恢复消费；同时临时禁用有问题的厂商查询
- 根本：给所有外部HTTP调用统一加超时配置（连接超时3s，读超时10s），用`@Async`异步化非关键的外部查询，不阻塞主消费流程

**总结**：这次问题让我养成了两个习惯：所有外部调用必须设超时，线程池监控必须纳入告警体系。