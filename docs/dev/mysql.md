---
outline: deep
---

# mysql

## 🔍 查询优化类

### 复制表结构（不含数据）
~~~
CREATE TABLE new_table LIKE old_table;
~~~

### 复制表结构 + 数据
~~~
CREATE TABLE backup_table AS
SELECT * FROM original_table;
~~~

### 计算两个日期之间的天数
~~~
SELECT DATEDIFF('2025-12-31', '2025-01-01') AS days_diff;
~~~

### 查询某字段的平均值、最大值、最小值
~~~
SELECT 
    AVG(price) AS avg_price,
    MAX(price) AS max_price,
    MIN(price) AS min_price,
    COUNT(*) AS total
FROM products;
~~~

### 删除重复数据，保留每个 (name, type) 中 id 最大的一条（即最新的）
~~~
DELETE t1 FROM your_table_name t1
INNER JOIN your_table_name t2
WHERE 
    t1.name = t2.name
    AND t1.type = t2.type
    AND t1.id < t2.id;
~~~

### 查找完全重复的整行数据
~~~
-- 查找哪些 email 出现了超过一次
SELECT email, COUNT(*) AS count
FROM users
GROUP BY email
HAVING COUNT(*) > 1;
~~~

### 快速修改大表结构
~~~
-- 添加列（在线操作，不影响业务）
ALTER TABLE large_table 
ADD COLUMN new_column INT DEFAULT 0,
ALGORITHM=INPLACE, LOCK=NONE;
~~~

### 死锁排查
~~~
-- 查看最近死锁信息
SHOW ENGINE INNODB STATUS;
~~~

###  监控长事务
~~~
-- 查看运行时间超过60秒的事务
SELECT * FROM information_schema.innodb_trx 
WHERE TIME_TO_SEC(TIMEDIFF(NOW(), trx_started)) > 60;
~~~

### 查找完全重复的整行数据
~~~
-- 查找哪些 email 出现了超过一次
SELECT email, COUNT(*) AS count
FROM users
GROUP BY email
HAVING COUNT(*) > 1;
~~~

## 🛠️ 数据维护类

### 备份表
~~~
-- 1.创建空表结构
CREATE TABLE tab_name_2025 LIKE tab_name;
-- 2.插入数据
INSERT INTO tab_name_2025
SELECT * FROM tab_name;
-- 3.清空表数据并重置自增主键
TRUNCATE TABLE tab_name;
-- 4.复制部分数据到新表
INSERT INTO tab_name_2025 SELECT * FROM tab_name_2025 where genre ='';
~~~

### 查询最近 7 天的数据
~~~
SELECT * FROM orders
WHERE created_at >= DATE_SUB(NOW(), INTERVAL 7 DAY);
~~~

### 按天/月统计数据量
~~~
-- 按天统计
SELECT DATE(created_at) AS day, COUNT(*) AS count
FROM orders
GROUP BY day
ORDER BY day;

-- 按月统计
SELECT DATE_FORMAT(created_at, '%Y-%m') AS month, COUNT(*) AS count
FROM orders
GROUP BY month;
~~~

### 快速清空大表（比 DELETE 快）
~~~
TRUNCATE TABLE large_table;
~~~

## 📊 数据分析类

### 表空间分析
~~~
-- 查看各表占用空间
SELECT 
    table_name,
    ROUND((data_length + index_length) / 1024 / 1024, 2) AS 'Size (MB)'
FROM information_schema.tables 
WHERE table_schema = 'your_database'
ORDER BY (data_length + index_length) DESC;
~~~

### 连接数监控
~~~
-- 查看当前连接数和使用情况
SHOW PROCESSLIST;
~~~

## 📝 实用小技巧

### 随机抽取数据
~~~
-- 随机抽取10条记录
SELECT * FROM users ORDER BY RAND() LIMIT 10;
~~~

### 随机抽取数据
~~~
-- 随机抽取10条记录
SELECT * FROM users ORDER BY RAND() LIMIT 10;
~~~

### 随机抽取数据
~~~
-- 随机抽取10条记录
SELECT * FROM users ORDER BY RAND() LIMIT 10;
~~~

### 随机抽取数据
~~~
-- 随机抽取10条记录
SELECT * FROM users ORDER BY RAND() LIMIT 10;
~~~




## 🔧 运维监控类