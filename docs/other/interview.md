# 🎯 Java面试宝典 - 完整增强版（大白话+代码+AI专题）

> 📌 **背诵技巧**：先看大白话理解→再看概念定义→最后结合项目场景说出来
> 📌 **项目关键词**：DCIM平台、千万级测点数据、Kafka告警、MQTT对接、ShardingSphere分库分表

---

## 第一章：Java基础

### JDK、JVM、JRE的区别？

**大白话**：
- JDK = 开发工具箱（写代码用的，包含编译器）
- JVM = 翻译官（把Java代码翻译成电脑能懂的语言）
- JRE = 运行环境（只是跑程序，不能开发）
- 关系：JDK包含JRE，JRE包含JVM

**概念**：
- JDK：Java开发工具包，提供编译、调试、运行Java程序的工具
- JVM：Java虚拟机，负责将字节码转换为机器码执行，实现跨平台
- JRE：Java运行时环境，包含JVM和核心类库，只能运行不能开发

---

### JDK1.8新特性？

**大白话**：1.8是Java里程碑版本，加了一堆让代码写起来更爽的功能

**主要特性**：
- **Lambda表达式**：匿名函数，少写很多代码
- **Stream流**：像流水线一样处理集合数据
- **Optional**：优雅解决空指针问题
- **接口默认方法**：接口可以有默认实现了
- **新时间API**：LocalDate、LocalDateTime，比Date好用多了
- **方法引用**：Class::method，更简洁

**代码示例**：
```java
// Lambda表达式 - 以前要写匿名内部类，现在一行搞定
List<String> list = Arrays.asList("banana", "apple", "cherry");
list.sort((a, b) -> a.compareTo(b));

// Stream流 - 链式操作，过滤+转换+收集
List<String> result = list.stream()
    .filter(s -> s.startsWith("a"))   // 过滤a开头的
    .map(String::toUpperCase)          // 转大写
    .collect(Collectors.toList());     // 收集结果

// Optional - 避免空指针
Optional<String> opt = Optional.ofNullable(getName());
String name = opt.orElse("默认名字");  // 为空时返回默认值
```

---

### JVM运行时数据区？

**大白话**：JVM把内存分成几块，各司其职
- **堆**：放对象的大仓库，GC主要在这里工作
- **栈**：每个线程一个，放方法调用记录
- **方法区**：放类信息、常量，就像图书馆的目录
- **程序计数器**：记住当前执行到哪一行，线程切换后能继续
- **本地方法栈**：调用C/C++代码用的

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

**对象年龄晋升**：
```
新对象 → Eden区
  ↓ GC后存活
幸存区S0/S1（来回复制，年龄+1）
  ↓ 年龄达到15次（默认）
老年代
  ↓ 老年代满了
Full GC（最耗时）
```

---

### Java垃圾回收机制？

**大白话**：Java自动帮你清理没用的对象，不需要手动释放内存（像C/C++那样）

**判断是否该回收**：可达性分析（从GC Roots出发，找不到引用就回收）

**GC Roots包括**：
- 虚拟机栈中的局部变量
- 静态变量
- 常量池中的引用

**回收算法**：
| 算法 | 优点 | 缺点 | 适用 |
|------|------|------|------|
| 标记-清除 | 简单 | 有内存碎片 | 老年代 |
| 标记-整理 | 无碎片 | 效率低 | 老年代 |
| 复制算法 | 快、无碎片 | 浪费一半空间 | 新生代 |

**常用垃圾收集器**：
- **G1**（推荐）：均衡吞吐量和延迟，JDK9默认
- **ZGC**：超低延迟，停顿<10ms
- **ParNew+CMS**：老项目常用

---

### 双亲委派模型？

**大白话**：类加载时，先问上级"你有没有加载过这个类？"有了就用现成的，没有才自己加载。就像公司报销，先问上级能不能批，不行再自己处理。

**作用**：防止核心类被篡改（你自己写个java.lang.String不会生效，因为父级已经加载了）

```
用户自定义类加载 → 先问应用类加载器
应用类加载器 → 先问扩展类加载器
扩展类加载器 → 先问启动类加载器（加载JDK核心类）
                     ↓ 没有才自己加载
```

---

### String、StringBuffer、StringBuilder区别？

**大白话**：
- String就像刻在石头上，改一次就刻一块新石头
- StringBuffer是橡皮泥，可以改，但改的时候要排队（加锁）
- StringBuilder是橡皮泥，可以改，不用排队（不加锁，更快）

**使用场景**：
```java
// String：字符串不变时用
String name = "张三";

// StringBuilder：循环拼接字符串，单线程（99%的场景用这个）
StringBuilder sb = new StringBuilder();
for (int i = 0; i < 1000; i++) {
    sb.append(i).append(",");  // 不会每次创建新对象
}
String result = sb.toString();

// StringBuffer：多线程环境下拼接字符串（少见）
StringBuffer buffer = new StringBuffer();
// 方法都加了synchronized，线程安全
```

---

### ==和equals的区别？

**大白话**：
- ==：比较的是"是不是同一个东西"（对于对象比地址，就像比身份证号）
- equals：比较的是"内容是不是一样"（就像比名字）

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

**大白话**：
- 接口：定义"能做什么"的规范，就像工作职责说明书，只说要做什么，不说怎么做
- 抽象类：半成品，有些方法实现了，有些留给子类实现

```java
// 接口：只定义规范
interface Flyable {
    void fly();  // 所有会飞的都要实现这个方法
    default void land() {  // JDK8后接口可以有默认实现
        System.out.println("降落");
    }
}

// 抽象类：半成品
abstract class Animal {
    String name;  // 可以有成员变量

    // 具体方法（已实现）
    void breathe() {
        System.out.println("呼吸");
    }

    // 抽象方法（子类必须实现）
    abstract void sound();
}

// 可以同时继承抽象类和实现多个接口
class Bird extends Animal implements Flyable {
    @Override
    void sound() { System.out.println("啾啾"); }
    @Override
    public void fly() { System.out.println("扑腾翅膀"); }
}
```

---

### 浅拷贝和深拷贝？

**大白话**：
- 浅拷贝：复印一张纸，但纸上贴的照片（引用对象）还是原来那张
- 深拷贝：完整复制，连照片也重新洗一张，两份完全独立

```java
// 浅拷贝问题演示
class Person implements Cloneable {
    String name;
    int[] scores;  // 引用类型

    @Override
    protected Object clone() throws CloneNotSupportedException {
        return super.clone();  // 浅拷贝
    }
}

Person p1 = new Person();
p1.scores = new int[]{90, 80};
Person p2 = (Person) p1.clone();  // 浅拷贝

p2.scores[0] = 100;  // 修改p2的成绩
System.out.println(p1.scores[0]);  // 结果：100（p1也被修改了！）

// 深拷贝方案：序列化/反序列化，或手动复制每个引用对象
// 推荐用第三方库：Apache Commons BeanUtils 或 Jackson
```

---

### 什么是内存泄漏？

**大白话**：对象没用了，但还有人拽着它不放，垃圾回收器没法清理，内存越来越小

**常见原因**：
```java
// 1. ThreadLocal没有remove（最常见）
ThreadLocal<String> tl = new ThreadLocal<>();
tl.set("用户ID:123");
// 用完必须remove！！！
tl.remove();  // 如果不调用，线程池环境下会泄漏

// 2. 静态集合持有对象
static List<Object> cache = new ArrayList<>();
cache.add(bigObject);  // 一直加，从不清理

// 3. 未关闭的资源
// 错误写法
Connection conn = getConnection();
// 如果这里抛异常，conn永远不会关闭
conn.close();

// 正确写法：try-with-resources
try (Connection conn = getConnection()) {
    // 自动关闭
}
```

---

## 第二章：集合

### 集合体系总览

**大白话**：Java的容器家族，根据不同需求选不同容器

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

**大白话**：
- ArrayList像数组格子，通过编号直接找到位置（查快），但插入要把后面的格子全部移动（增删慢）
- LinkedList像链条，每个节点记着下一个在哪，插入只需要改一下指向（增删快），但找第100个要从头数（查慢）

```java
// ArrayList适合：频繁查询，少增删
ArrayList<String> list = new ArrayList<>();
list.get(100);  // O(1)，直接通过下标访问，很快

// LinkedList适合：频繁增删，少查询
LinkedList<String> linked = new LinkedList<>();
linked.addFirst("头部插入");  // O(1)，很快
linked.addLast("尾部插入");   // O(1)，很快

// 性能测试
long start = System.currentTimeMillis();
// 中间插入10万次，ArrayList要比LinkedList慢很多
for (int i = 0; i < 100000; i++) {
    list.add(list.size() / 2, "插入");  // 每次都要移动一半元素
}
```

---

### HashMap底层原理？

**大白话**：HashMap就像一个超大的停车场
- 停车场有16个区（数组，初始容量16）
- 根据车牌号（hash值）决定停哪个区
- 同一个区来了多辆车，就排队（链表）
- 排队超过8辆，就建多层立体停车场（红黑树）
- 停车场满了75%，就扩建成2倍大（扩容）

```java
// HashMap基本操作
HashMap<String, Integer> map = new HashMap<>();
map.put("张三", 25);  // 存入
map.get("张三");       // 获取：25
map.containsKey("李四");  // 判断key是否存在

// put流程（源码简化版）
// 1. 计算key的hash值
// 2. hash值 & (数组长度-1) 得到数组下标
// 3. 下标位置为空，直接放
// 4. 不为空，遍历链表/红黑树找key相同的，有则更新，无则追加

// 扩容触发条件
// 元素数量 > 容量(16) × 负载因子(0.75) = 12
// 超过12个元素就扩容到32

// 注意：HashMap线程不安全！
// 多线程场景用ConcurrentHashMap
```

**为什么容量是2的N次方？**
```java
// 计算下标公式：index = hash & (capacity - 1)
// 容量16时，15的二进制：01111
// 任何hash值 & 01111，结果都在0-15范围内
// 位运算比取模（%）快很多
```

---

### ConcurrentHashMap为什么线程安全？

**大白话**：
- HashTable：整个停车场上一把大锁，同时只能一辆车进出（效率低）
- ConcurrentHashMap：每个停车位单独上锁，互不干扰（效率高）

```java
// JDK1.8实现原理：CAS + synchronized（只锁单个桶）
// 读操作：不加锁（volatile保证可见性）
// 写操作：先CAS尝试，失败了再synchronized锁住单个链表头节点

ConcurrentHashMap<String, Integer> map = new ConcurrentHashMap<>();
// 多线程安全的计数
map.compute("count", (k, v) -> v == null ? 1 : v + 1);

// 原子操作
map.putIfAbsent("key", 1);  // 不存在才put
```

---

### HashSet如何检查重复？

**大白话**：HashSet底层就是HashMap，存的是键，值是个固定的占位Object。判断重复先比hashCode（快速过滤），再用equals（精确比较）。

```java
// 自定义对象要重写hashCode和equals
class User {
    String name;
    int age;

    @Override
    public int hashCode() {
        return Objects.hash(name, age);  // 用name和age计算hash
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof User)) return false;
        User user = (User) o;
        return age == user.age && Objects.equals(name, user.name);
    }
}

Set<User> set = new HashSet<>();
set.add(new User("张三", 25));
set.add(new User("张三", 25));  // 不会重复添加，因为hashCode和equals相同
System.out.println(set.size());  // 输出：1
```

---

## 第三章：多线程

### 创建线程的方式？

**大白话**：就像安排人干活，有4种方式

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
ExecutorService pool = Executors.newFixedThreadPool(5);
pool.submit(() -> System.out.println("线程池执行"));
pool.shutdown();
```

---

### 线程池7个核心参数？

**大白话**：就像一个外包团队的管理规则
1. 核心员工数（corePoolSize）：长期保留的员工
2. 最多员工数（maximumPoolSize）：忙不过来时最多招多少临时工
3. 临时工等待时间（keepAliveTime）：临时工闲置多久就辞退
4. 时间单位（unit）：秒/分钟/小时
5. 任务等待室（workQueue）：核心员工都忙了，新任务在这等
6. 员工工厂（threadFactory）：决定员工的名字、优先级
7. 拒绝策略（handler）：等待室也满了，新任务怎么处理

```java
// 自定义线程池（推荐这样写，不要用Executors工厂方法）
ThreadPoolExecutor pool = new ThreadPoolExecutor(
    5,                              // 核心线程数
    10,                             // 最大线程数
    60L,                            // 空闲存活时间
    TimeUnit.SECONDS,               // 时间单位
    new LinkedBlockingQueue<>(100), // 等待队列（最多100个）
    new ThreadFactoryBuilder().setNameFormat("alarm-pool-%d").build(), // 线程命名
    new ThreadPoolExecutor.CallerRunsPolicy()  // 拒绝策略：调用者自己执行
);

// 项目中告警消费线程池配置
// 核心5线程，最大10线程，队列100，拒绝时调用者执行（保证告警不丢）
```

---

### 线程池工作流程？

**大白话**：就像餐厅点餐
1. 有空闲服务员（核心线程）→ 直接服务
2. 服务员都忙 → 先等位（进队列）
3. 等位满了 → 临时招人（非核心线程）
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

### synchronized和Lock区别？

**大白话**：
- synchronized：自动上锁解锁，就像自动门，进去自动锁，出来自动开
- Lock：手动上锁解锁，功能更多，但忘了解锁就死锁

```java
// synchronized用法
synchronized (this) {
    // 临界区代码
}  // 自动解锁，即使抛异常也会解锁

// Lock用法（必须在finally里unlock！）
ReentrantLock lock = new ReentrantLock();
lock.lock();
try {
    // 临界区代码
} finally {
    lock.unlock();  // 必须！否则死锁
}

// Lock的高级功能
lock.tryLock(3, TimeUnit.SECONDS);  // 尝试获取锁，最多等3秒
lock.lockInterruptibly();            // 可中断等待

// 公平锁（按等待顺序获取锁）
ReentrantLock fairLock = new ReentrantLock(true);

// 项目中：告警去重用ReentrantLock，支持tryLock避免死等
```

---

### volatile关键字作用？

**大白话**：
- 可见性：A改了变量，B能立刻看到最新值（不从本地缓存读）
- 禁止重排序：代码按你写的顺序执行，不乱序

```java
// 没有volatile的问题
class Counter {
    private boolean running = true;

    public void stop() {
        running = false;  // 线程A修改
    }

    public void run() {
        while (running) {  // 线程B可能读到旧值，永远循环
            doWork();
        }
    }
}

// 加volatile解决可见性
class Counter {
    private volatile boolean running = true;  // 加volatile
    // 现在线程B能立刻看到线程A的修改
}

// volatile不能保证原子性！
volatile int count = 0;
count++;  // 这不是原子操作，多线程下还是会有问题
// 需要用AtomicInteger
AtomicInteger atomicCount = new AtomicInteger(0);
atomicCount.incrementAndGet();  // 原子自增，线程安全
```

---

### ThreadLocal是什么？

**大白话**：每个线程专属的小抽屉，线程A放进去的东西，线程B看不到，各不干扰

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

## 第四章：网络与Web

### TCP三次握手四次挥手？

**大白话**：
- 三次握手：打电话时"喂，你听得到吗？" "听得到，你听得到我吗？" "听得到，开始说吧"
- 四次挥手：挂电话时，一方说"我说完了"，另一方说"好，我还有话说"，说完后"我也说完了"，"好，挂了"

**为什么是三次**：确保双方都能正常收发数据，两次不够（不能确认服务器收到了客户端的确认）

**为什么挥手是四次**：因为TCP是全双工，关闭时两个方向各自独立关闭

---

### 过滤器和拦截器区别？

**大白话**：
- 过滤器：大门保安，所有人都要过（Servlet级别）
- 拦截器：公司前台，进了门才遇到（Spring级别）

```java
// 过滤器（实现Filter接口）
@Component
public class CharsetFilter implements Filter {
    @Override
    public void doFilter(ServletRequest request, ServletResponse response,
                         FilterChain chain) throws IOException, ServletException {
        request.setCharacterEncoding("UTF-8");
        chain.doFilter(request, response);  // 继续往下走
    }
}

// 拦截器（实现HandlerInterceptor）
@Component
public class LoginInterceptor implements HandlerInterceptor {
    @Override
    public boolean preHandle(HttpServletRequest request,
                              HttpServletResponse response, Object handler) {
        String token = request.getHeader("Authorization");
        if (token == null) {
            response.setStatus(401);
            return false;  // 返回false，请求不继续
        }
        return true;
    }
}

// 注册拦截器
@Configuration
public class WebConfig implements WebMvcConfigurer {
    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(new LoginInterceptor())
                .addPathPatterns("/api/**")      // 拦截这些路径
                .excludePathPatterns("/api/login"); // 不拦截登录
    }
}
```

---

## 第五章：Spring全家桶

### Spring IOC是什么？

**大白话**：以前你要用一个对象，要自己new；用了IOC，告诉Spring我要用这个，Spring自动给你，你不用管怎么创建的

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

**大白话**：不改原来代码，在方法执行前/后/出错时插入额外逻辑。就像给蛋糕加装饰，不用重做蛋糕

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

**大白话**：Bean从出生到死亡的过程，就像人的一生

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

**大白话**：方法A调用方法B时，B的事务怎么处理

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

### Spring事务失效场景？

**大白话**：以为加了@Transactional就有事务，其实有这些坑

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

### Spring循环依赖如何解决（三级缓存）？

**大白话**：A需要B，B需要A，互相等对方先出生，就死锁了。Spring用"早期引用"解决：A先出生一个半成品，把半成品给B用，B完成了再回来把A补全。

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

### MyBatis #{}和${}区别？

**大白话**：
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

## 第六章：数据库MySQL

### 索引失效场景（必考）？

**大白话**：建了索引但没用上，就像有导航不用，还是漫无目的找

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

### MySQL分库分表（项目经验）？

**大白话**：一张桌子放不下，就多搬几张桌子来放

**项目实战（DCIM平台）**：
```yaml
# application.yml - ShardingSphere配置
spring:
  shardingsphere:
    datasource:
      names: ds0, ds1
      ds0:
        type: com.zaxxer.hikari.HikariDataSource
        driver-class-name: com.mysql.cj.jdbc.Driver
        jdbc-url: jdbc:mysql://localhost:3306/dcim_0
        username: root
        password: 123456
      ds1:
        jdbc-url: jdbc:mysql://localhost:3306/dcim_1

    rules:
      sharding:
        tables:
          # 测点数据表配置
          point_data:
            # 实际存在的节点：ds0.point_data_0 到 ds1.point_data_15
            actual-data-nodes: ds$->{0..1}.point_data_$->{0..15}
            # 分库策略
            database-strategy:
              standard:
                sharding-column: factory_id
                sharding-algorithm-name: db-inline
            # 分表策略
            table-strategy:
              standard:
                sharding-column: factory_id
                sharding-algorithm-name: table-inline

        sharding-algorithms:
          db-inline:
            type: INLINE
            props:
              algorithm-expression: ds$->{factory_id % 2}  # 按厂商ID分2个库
          table-inline:
            type: INLINE
            props:
              algorithm-expression: point_data_$->{factory_id % 16}  # 分16张表
```

```java
// 分表后的查询（ShardingSphere自动路由）
@Mapper
public interface PointDataMapper extends BaseMapper<PointData> {
    // 查询某厂商的数据（自动路由到对应分表）
    @Select("SELECT * FROM point_data WHERE factory_id = #{factoryId} LIMIT #{limit}")
    List<PointData> findByFactory(Long factoryId, Integer limit);
}

// 面试话术：
// "我们测点数据超过1000万，按厂商ID对16取模，
//  分到16张表中，同一厂商数据在同一张表，
//  查询时ShardingSphere自动路由，
//  核心查询从8秒优化到300毫秒以内。"
```

---

### MySQL三大日志？

**大白话**：
- binlog：银行的流水账，记录所有改动，用于主从同步
- redo log：草稿纸，先在这里记，然后再写到正式账本（防崩溃丢数据）
- undo log：改之前先备份旧版本，事务回滚时用

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

## 第七章：Redis

### Redis数据类型及使用场景？

**大白话**：Redis是内存数据库，速度极快，有5种数据结构

```java
// String：最简单的键值对
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

**大白话**：
- 穿透：查一个不存在的数据（黑客攻击），Redis没有就去查DB，DB也没有，每次都白跑DB
- 击穿：一个超热门的key过期了，一瞬间所有人都去查DB（哈利波特图书馆崩溃效应）
- 雪崩：大批key同时过期，大量请求同时打DB（多米诺骨牌）

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

## 第八章：Kafka（项目重点）

### Kafka核心概念？

**大白话**：Kafka就像一个超高速传送带
- Topic：传送带（按类型分类）
- Partition：传送带分成多条并行（提高吞吐）
- Producer：往传送带上放东西的人
- Consumer：从传送带取东西的人
- Consumer Group：一组取货员，每条传送带只分配给一个取货员

```
生产者发消息 → Topic → Partition0 → 消费者A
                      → Partition1 → 消费者B
                      → Partition2 → 消费者C
（3个分区对应3个消费者，并行消费，速度是单个的3倍）
```

---

### Kafka如何保证消息不丢失（项目实战）？

**大白话**：三道保险：生产者确认、Broker存副本、消费者手动确认

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

### Kafka如何避免重复消费（幂等性）？

**大白话**：就像快递签收，每个包裹有唯一单号，签过了就不签第二次

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

## 第九章：MQTT（项目经验）

### MQTT协议是什么？

**大白话**：MQTT就像微信群，设备（群成员）发消息给服务器（群主），后端（其他群成员）订阅接收。特点是消息很小，省流量，适合物联网设备

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

## 第十章：Spring Cloud微服务

### Nacos工作原理？

**大白话**：
- 注册中心：就像公司通讯录，每个服务启动时把自己的电话（IP+端口）登记进去，别人要打电话就来查
- 配置中心：集中管理配置文件，改了配置不用重启服务

```java
// 服务注册（自动，加了nacos依赖就行）
# application.yml
spring:
  cloud:
    nacos:
      discovery:
        server-addr: 127.0.0.1:8848  # Nacos地址
      config:
        server-addr: 127.0.0.1:8848
        file-extension: yaml

// 服务调用（Feign声明式调用）
@FeignClient(name = "alarm-service")  // 服务名（Nacos里注册的）
public interface AlarmFeignClient {
    @GetMapping("/api/alarm/list")
    List<AlarmVO> getAlarms(@RequestParam Long factoryId);
}

// 使用
@Autowired
private AlarmFeignClient alarmFeignClient;

List<AlarmVO> alarms = alarmFeignClient.getAlarms(factoryId);
// Feign自动从Nacos获取alarm-service的地址，发HTTP请求

// 动态配置刷新
@RefreshScope  // 加这个注解，Nacos配置变更时自动刷新
@RestController
public class AlarmController {
    @Value("${alarm.threshold:100}")  // 告警阈值，可以在Nacos动态修改
    private int threshold;
}
```

---

### 什么是服务熔断和降级？

**大白话**：
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

## 第十一章：项目核心问题（面试必备）

### ❓ 千万级数据如何存储和查询？

**面试话术**：
```
"我们DCIM平台有100万+测点，实时+历史数据达到千万级。
 单表查询慢到8秒，我们引入了ShardingSphere做水平分表。

 分片策略：按厂商ID对16取模，分成16张表，
 同一厂商数据必然在同一张表，不会跨表查询。

 同时做了冷热分离：
 - 3个月内数据在主表（建了复合索引，factory_id+create_time）
 - 超过3个月的数据定期归档到备份表
 - 超过1年的极少查询的数据可以考虑转对象存储

 优化效果：核心查询从8秒降到300毫秒以内，
 存储成本降低约40%。"
```

---

### ❓ Kafka高并发告警可靠性方案？

**面试话术**：
```
"我们统一告警模块单日峰值告警10万+条，
 涉及机房安全责任，必须零漏报。

 我们从三个层面保证：

 消息不丢失：
 生产者acks=all，所有副本确认才算发送成功；
 消费者手动提交offset，处理成功才确认；
 引入死信队列，重试3次失败的消息转入DLQ，
 人工介入处理，同时发钉钉告警给运维。

 消息不重复：
 Redis存储消息唯一ID（厂商+设备+时间+告警码），
 消费前SETNX校验，已处理则跳过；
 数据库层加唯一索引兜底，双重保障。

 消费延迟：
 按厂商分8个Partition，对应8个消费者线程；
 监控Consumer Lag，超1000条触发预警；
 P1级关键告警设置MQTT双通道备用。

 上线后实现零漏报，成功规避多起机房安全隐患。"
```

---

### ❓ MQTT从零对接厂商设备？

**面试话术**：
```
"我们有几家厂商不支持HTTP或Kafka，只能通过MQTT协议对接。
 我独立完成了从零到上线的全过程。

 主要解决的技术难点：
 1. 连接稳定性：设置心跳60秒，开启自动重连，
    自定义重连监听器，断线后指数退避重试（1s→2s→4s→最大60s）

 2. 消息乱序：用设备ID作为消息key，
    保证同一设备的告警有序处理

 3. 消息质量：关键告警设置QoS2（恰好一次），
    避免告警重复或丢失

 4. 海量设备：按厂商设计Topic层级
    /factory/{code}/device/{id}/alarm，
    多消费者订阅不同厂商的Topic并行处理"
```

---

## 第十二章：AI相关（新增专题）

### AI大白话入门

**大白话**：AI（人工智能）就是让电脑像人一样思考和回答问题

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

**大白话**：读了海量书籍的超级学生，能回答各种问题
- 代表：GPT-4、Claude、DeepSeek、通义千问、文心一言
- 特点：通过训练几乎"读遍"了互联网上的文字

#### 2. Token（令牌）

**大白话**：AI处理文字的基本单位，中文一般1个字=1-2个Token
```
"你好世界" → ["你", "好", "世", "界"] = 4个Token
计费通常按Token数量，输入+输出一起算
```

#### 3. Prompt（提示词）

**大白话**：你给AI的指令，Prompt写得好，回答质量高十倍

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
- 给示例（Few-Shot）
```

#### 4. Embedding（向量化）

**大白话**：把文字转成一串数字，让电脑能计算文字之间的相似程度
```
"苹果" → [0.8, 0.2, -0.5, ...]
"橙子" → [0.7, 0.3, -0.4, ...]  ← 和苹果相似，数字接近
"汽车" → [-0.2, 0.9, 0.8, ...]  ← 和苹果差异大，数字差异大

向量距离越近 = 语义越相似
用途：语义搜索、推荐系统、RAG
```

#### 5. RAG（检索增强生成）

**大白话**：AI不知道你公司内部数据，RAG先帮你查出相关资料，再喂给AI回答。就像开卷考试，AI先查笔记再答题

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

```java
// Java实现RAG简单示例
@Service
public class RagService {
    @Autowired
    private VectorStore vectorStore;  // 向量数据库（如Milvus）
    @Autowired
    private OpenAiChatClient chatClient;  // AI客户端

    public String answer(String question) {
        // 1. 把问题向量化，在向量库里搜索相关文档
        List<Document> relevantDocs = vectorStore.similaritySearch(
            SearchRequest.query(question).withTopK(3)  // 找最相关的3条
        );

        // 2. 把相关文档拼成上下文
        String context = relevantDocs.stream()
            .map(Document::getContent)
            .collect(Collectors.joining("\n---\n"));

        // 3. 构建带上下文的Prompt
        String prompt = String.format("""
            你是一个数据中心运维助手，根据以下数据回答问题，
            如果数据中没有相关信息，请说"数据中没有相关记录"。
            
            参考数据：
            %s
            
            问题：%s
            """, context, question);

        // 4. 调用AI生成回答
        return chatClient.call(prompt);
    }
}
```

#### 6. Text2SQL

**大白话**：用自然语言查数据库，不用写SQL。你说"给我看看北七家上周的告警"，AI自动生成SQL查出来

```java
// 项目中Text2SQL实现
@Service
public class Text2SqlService {

    private static final String SYSTEM_PROMPT = """
        你是一个数据库查询专家，根据用户的自然语言问题生成对应的MySQL查询SQL。
        
        数据库表结构：
        alarm表（告警表）：
          - id: 主键
          - factory_code: 厂商编码
          - device_id: 设备ID
          - alarm_level: 告警级别（1=P1,2=P2,3=P3）
          - alarm_time: 告警时间
          - alarm_desc: 告警描述
          - status: 状态（0=未处理,1=已处理,2=已恢复）
          - factory_location: 机房位置（如：北七家、上地）
        
        point_data表（测点数据表）：
          - factory_code: 厂商编码
          - device_id: 设备ID
          - point_name: 测点名称（如：电量、温度）
          - value: 数值
          - unit: 单位
          - record_time: 记录时间
        
        规则：
        1. 只能生成SELECT语句，不能生成INSERT/UPDATE/DELETE
        2. 只返回SQL语句，不要解释
        3. 时间范围查询用BETWEEN，日期格式用 'yyyy-MM-dd'
        4. 未提及条件不要加
        """;

    @Autowired
    private DeepSeekClient deepSeekClient;  // AI客户端

    public String naturalLanguageQuery(String question) {
        // 1. 调用AI生成SQL
        String sql = deepSeekClient.chat(SYSTEM_PROMPT, question);

        // 2. 安全校验（只允许SELECT）
        if (!sql.trim().toUpperCase().startsWith("SELECT")) {
            throw new SecurityException("只允许查询操作！");
        }

        // 3. 执行SQL
        List<Map<String, Object>> results = jdbcTemplate.queryForList(sql);

        // 4. 把结果让AI整理成自然语言
        String resultJson = JSON.toJSONString(results);
        String summaryPrompt = "根据以下查询结果，用简洁的中文回答用户的问题。\n" +
                               "用户问题：" + question + "\n" +
                               "查询结果：" + resultJson;
        return deepSeekClient.chat(summaryPrompt);
    }
}
```

#### 7. Function Calling（函数调用）

**大白话**：给AI一个工具箱，AI根据问题自动决定用哪个工具

```
工具箱里有：
- 查询告警工具（getAlarmList）
- 查询能耗工具（getEnergyData）
- 发送通知工具（sendNotification）

用户说："帮我查一下北七家最新的P1告警，
        如果超过10条就发邮件通知运维"

AI自动：
1. 调用 getAlarmList(location="北七家", level="P1")
2. 发现有15条P1告警
3. 调用 sendNotification(type="email", message="...")
4. 回答用户："已查到15条P1告警，邮件通知已发送"
```

#### 8. Agent（智能体）

**大白话**：能自主规划任务、使用工具、执行多步骤任务的AI
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

**大白话**：专门存储向量（数字数组）的数据库，能快速找出"最相似"的数据
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

**大白话**：让AI"先思考再回答"，就像做数学题先列步骤再给答案，准确率更高

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

### AI在Java项目中的实践

#### Spring AI框架

**大白话**：Spring官方的AI集成框架，让Java调用AI像调用普通接口一样简单

```xml
<!-- pom.xml -->
<dependency>
    <groupId>org.springframework.ai</groupId>
    <artifactId>spring-ai-openai-spring-boot-starter</artifactId>
    <version>0.8.1</version>
</dependency>
```

```yaml
# application.yml
spring:
  ai:
    openai:
      api-key: your-api-key
      base-url: https://api.deepseek.com  # DeepSeek兼容OpenAI接口
      chat:
        options:
          model: deepseek-chat
          temperature: 0.7  # 创造性（0=保守，1=发散）
```

```java
// 基本使用
@RestController
public class AiController {
    @Autowired
    private ChatClient chatClient;

    @PostMapping("/ai/query")
    public String query(@RequestBody String question) {
        return chatClient.call(question);
    }

    // 流式输出（打字机效果）
    @GetMapping(value = "/ai/stream", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public Flux<String> stream(@RequestParam String question) {
        return chatClient.stream(question);
    }
}
```

#### 如何调用DeepSeek（你项目中用的）

```java
// 直接用HTTP调用（不依赖Spring AI）
@Service
public class DeepSeekService {

    private static final String API_URL = "https://api.deepseek.com/v1/chat/completions";

    @Value("${deepseek.api-key}")
    private String apiKey;

    public String chat(String systemPrompt, String userMessage) {
        // 构建请求体
        Map<String, Object> requestBody = new HashMap<>();
        requestBody.put("model", "deepseek-chat");
        requestBody.put("temperature", 0.1);  // 低温度，输出更稳定（适合SQL生成）

        List<Map<String, String>> messages = new ArrayList<>();
        if (systemPrompt != null) {
            messages.add(Map.of("role", "system", "content", systemPrompt));
        }
        messages.add(Map.of("role", "user", "content", userMessage));
        requestBody.put("messages", messages);

        // 发HTTP请求
        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + apiKey);
        headers.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<Map<String, Object>> entity = new HttpEntity<>(requestBody, headers);
        ResponseEntity<Map> response = restTemplate.postForEntity(API_URL, entity, Map.class);

        // 解析结果
        List<Map> choices = (List<Map>) response.getBody().get("choices");
        Map message = (Map) choices.get(0).get("message");
        return (String) message.get("content");
    }
}
```

---

### AI面试常见问题

**Q1：AI大模型底层原理是什么？**
```
大白话版回答：
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

**Q3：如何防止AI生成有害的SQL？**
```java
// SQL安全校验
public void validateSql(String sql) {
    String upperSql = sql.trim().toUpperCase();

    // 1. 只允许SELECT
    if (!upperSql.startsWith("SELECT")) {
        throw new SecurityException("只允许SELECT查询");
    }

    // 2. 禁止危险关键词
    List<String> forbidden = Arrays.asList(
        "DROP", "DELETE", "UPDATE", "INSERT",
        "TRUNCATE", "ALTER", "CREATE", "EXEC"
    );
    for (String keyword : forbidden) {
        if (upperSql.contains(keyword)) {
            throw new SecurityException("SQL包含危险关键词：" + keyword);
        }
    }

    // 3. 限制查询结果数量（防止全表扫描）
    if (!upperSql.contains("LIMIT")) {
        sql = sql + " LIMIT 1000";  // 自动加限制
    }
}
```

**Q4：什么是幻觉（Hallucination）？怎么解决？**
```
大白话：AI有时候会"一本正经地胡说八道"，
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

---

## 第十三章：设计模式

### 常见设计模式（结合项目）

**大白话**：设计模式是代码问题的经典解决方案，就像武术套路

```java
// 1. 单例模式 - Spring默认Bean作用域
// 大白话：整个程序只有一个实例，节省资源
public class AlarmConfig {
    private volatile static AlarmConfig instance;

    private AlarmConfig() {}

    public static AlarmConfig getInstance() {
        if (instance == null) {
            synchronized (AlarmConfig.class) {
                if (instance == null) {
                    instance = new AlarmConfig();
                }
            }
        }
        return instance;
    }
}

// 2. 策略模式 - 告警处理策略
// 大白话：同一操作有多种实现方式，可以灵活切换
interface AlarmStrategy {
    void handle(AlarmDTO alarm);
}

// P1告警策略：立即通知
@Component("p1Strategy")
class P1AlarmStrategy implements AlarmStrategy {
    @Override
    public void handle(AlarmDTO alarm) {
        notifyService.sendImmediate(alarm);  // 立即发送
        networkMonitorService.push(alarm);   // 推送网监
        createWorkOrder(alarm);              // 自动创建工单
    }
}

// P3告警策略：只记录
@Component("p3Strategy")
class P3AlarmStrategy implements AlarmStrategy {
    @Override
    public void handle(AlarmDTO alarm) {
        alarmMapper.insert(alarm);  // 只记录，不通知
    }
}

// 根据告警级别选择策略
@Service
public class AlarmService {
    @Autowired
    private Map<String, AlarmStrategy> strategies;  // Spring自动注入所有策略

    public void process(AlarmDTO alarm) {
        String strategyKey = "p" + alarm.getLevel() + "Strategy";
        AlarmStrategy strategy = strategies.get(strategyKey);
        strategy.handle(alarm);  // 自动选择对应策略
    }
}

// 3. 工厂模式 - 创建不同厂商的数据适配器
// 大白话：根据条件创建不同的对象，不暴露创建细节
interface DataAdapter {
    List<DeviceData> fetchData(String factoryCode);
}

class AdapterFactory {
    public static DataAdapter create(String protocol) {
        return switch (protocol) {
            case "HTTP" -> new HttpDataAdapter();
            case "MQTT" -> new MqttDataAdapter();
            case "Kafka" -> new KafkaDataAdapter();
            default -> throw new IllegalArgumentException("不支持的协议：" + protocol);
        };
    }
}
```

---

## 第十四章：登录与鉴权

### JWT登录流程？

**大白话**：JWT就像景区门票，进门检验合法后领票，之后进每个景点刷票就行，不用每次去入口重新检验

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

## 第十五章：快速速查表

### 面试高频考点TOP20
```
1.  HashMap底层原理 + 扩容机制（必考）
2.  ConcurrentHashMap vs HashTable
3.  JVM内存模型 + GC回收算法
4.  线程池7个参数 + 工作流程（必考）
5.  synchronized vs Lock 区别
6.  MySQL索引失效8种场景（必考）
7.  MySQL事务隔离级别 + MVCC原理
8.  ShardingSphere分库分表（项目，必考）
9.  Redis缓存穿透击穿雪崩解决方案
10. Redis分布式锁实现
11. Kafka消息不丢失三层保障（项目，必考）
12. Kafka消息幂等性Redis去重（项目，必考）
13. Spring事务失效6种场景（必考）
14. Spring循环依赖 + 三级缓存
15. SpringBoot自动配置原理
16. 微服务熔断降级（Sentinel）
17. JWT完整登录流程
18. CAP理论（CP vs AP）
19. 双亲委派模型
20. volatile vs synchronized 区别
```

### 和简历挂钩必背场景
```
千万级数据  → ShardingSphere分16表，查询8s→300ms，冷热分离
消息不丢失  → acks=all+副本数2+手动offset+死信队列+钉钉告警
消息不重复  → Redis SETNX唯一ID + 数据库唯一索引兜底
告警延迟    → 8分区+8消费者+Consumer Lag监控+MQTT双通道备用
MQTT对接    → EMQX+心跳60s+自动重连+QoS2关键告警
超时订单    → EMQX延迟消息（精准触发vs定时轮询）
自动派单    → XXL-JOB分片广播+乐观锁防重复派单
AI功能      → Text2SQL+Schema注入+SQL安全校验+自然语言回答
```

### 5分钟快速回忆口诀
```
基础：   GC找不到根就回收，HashMap数组链表红黑树
集合：   查频用ArrayList，改频用LinkedList，线程安全ConcurrentHashMap
线程：   线程池7参数，核心/最大/存活/单位/队列/工厂/拒绝
锁：     synchronized自动，Lock手动，volatile只保可见性不保原子
Spring： IOC管对象，AOP加功能，事务失效记6种
数据库：  索引失效记8种，分表用ShardingSphere，三大日志binlog/redo/undo
Redis：  穿透布隆，击穿互斥锁，雪崩随机过期
Kafka：  不丢三层（acks/副本/手动提交），不重Redis去重
AI：     LLM预测下一个词，RAG先检索再回答，Text2SQL自然语言转SQL
```

---

## 附录：面试话术模板

### 自我介绍（1分钟版）
```
"您好，我叫梁磊，有5年Java全栈开发经验。
 目前就职于浪潮科技，负责数据中心DCIM平台的核心开发，
 平台接入了10多家厂商的设备数据，
 管理测点超过100万，是一个物联网+数据中心领域的综合平台。

 我独立负责前后端加运维的全链路工作，
 在这个过程中解决了不少技术挑战，
 比如千万级数据的分库分表优化、
 Kafka高并发告警的可靠性保障，
 以及多协议厂商数据接入等。

 我在兴元公司时做过物联网无人售货机项目，
 接触到了MQTT、XXL-JOB等技术。

 目前希望找到一个技术氛围更好、
 业务规模更大的团队，继续深耕后端领域。"
```

### 遇到不会的问题
```
"这块我目前了解得还不够深入，
 我知道它的基本原理是XXX，
 在项目中我用XXX方式解决类似问题，
 后续我会针对这块深入学习研究。"
```

### 为什么离职
```
"在浪潮成长了很多，做了将近3年，
 独立负责了DCIM平台从建设到上线的全过程，
 技术上也有不少积累。
 现在想寻求更大的平台，
 接触更大规模的业务和技术挑战，
 进一步提升自己的技术深度和广度。"
```

### 优点
```
"我的优势主要是全栈能力强，
 前后端加运维都能独立完成，
 解决问题的能力也比较强，
 项目中遇到的千万级数据、告警可靠性这些难题，
 基本上都是我独立研究解决的。
 另外学习能力也比较快，
 比如MQTT协议、ShardingSphere这些，
 都是在项目需要时自学并快速落地的。"
```

### 缺点（套路答法）
```
"我有时候对代码质量要求比较高，
 会花比较多时间在技术方案的打磨上，
 但也在努力平衡，
 在保证基本质量的前提下提高交付效率，
 不过多纠结完美。"
```

---

*📝 文档版本：2026年4月*  
*🎯 目标薪资：15-18K*  
*💪 技术是真实的，面试是临门一脚，加油！*