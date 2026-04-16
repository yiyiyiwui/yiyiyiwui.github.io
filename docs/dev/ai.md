---
outline: deep
---

# AI

## 什么是AI

AI（Artificial Intelligence，人工智能）是指让机器（尤其是计算机系统）模拟人类智能过程的技术。

**核心能力：**
- **学习**：从数据中获取知识和规律
- **推理**：运用规则推导出结论
- **感知**：理解图像、声音、文字等输入
- **决策**：基于分析做出判断或预测

**AI的三个层次：**

| 层次 | 定义 | 示例 |
|:---|:---|:---|
| **弱人工智能（ANI）** | 专注于特定任务的AI | 人脸识别、语音助手、推荐系统 |
| **强人工智能（AGI）** | 具备人类通用智能 | 尚未实现，ChatGPT等大模型是雏形 |
| **超人工智能（ASI）** | 超越人类智能 | 理论阶段 |

---

## 底层怎么实现的

### 1. 机器学习（ML）核心流程

```
原始数据 → 数据预处理 → 特征工程 → 模型训练 → 模型评估 → 部署推理
```

### 2. 神经网络的数学原理

最简单的神经元（感知机）：
```
输出 = 激活函数( Σ(权重ᵢ × 输入ᵢ) + 偏置 )

其中：
- 权重(weight)：决定输入的重要性
- 偏置(bias)：调整激活阈值
- 激活函数：引入非线性，如ReLU、Sigmoid、Tanh
```

### 3. 训练过程（反向传播）

```
前向传播：输入 → 隐藏层 → 输出 → 计算损失
反向传播：损失 → 梯度计算 → 更新权重
迭代优化：重复以上步骤，直到损失最小化
```

### 4. 大语言模型（LLM）的特殊架构

```
Transformer 核心机制：自注意力（Self-Attention）

输入序列 → 位置编码 → 多头注意力 → 前馈网络 → 输出

关键突破：通过注意力机制捕捉长距离依赖关系
```

**技术栈分层：**

| 层次 | 技术 | 说明 |
|:---|:---|:---|
| 硬件层 | GPU、TPU、NPU | 并行计算加速 |
| 框架层 | PyTorch、TensorFlow、JAX | 深度学习开发框架 |
| 模型层 | Hugging Face、vLLM | 模型库和推理引擎 |
| 应用层 | LangChain、LlamaIndex | Agent和RAG应用开发 |

---

## 业务使用场景

### 各领域应用对照表

| 领域 | 应用场景 | 典型案例 |
|:---|:---|:---|
| **电商** | 个性化推荐、智能客服、销量预测 | 亚马逊推荐、阿里小蜜 |
| **金融** | 风控反欺诈、量化交易、智能投顾 | 蚂蚁集团CTU、彭博终端 |
| **医疗** | 医学影像诊断、药物研发、病历分析 | 腾讯觅影、AlphaFold |
| **制造业** | 缺陷检测、预测性维护、智能排产 | 特斯拉工厂、西门子MindSphere |
| **内容行业** | AIGC文案、视频生成、智能翻译 | ChatGPT、Midjourney、DeepL |
| **安全领域** | 人脸识别、异常检测、舆情监控 | 海康威视、天眼系统 |

### 开发中的常见场景

```java
// 1. 文本分类（垃圾邮件识别）
// 2. 实体抽取（合同关键信息提取）
// 3. 代码生成（GitHub Copilot类应用）
// 4. NL2SQL（自然语言转SQL查询）
// 5. 智能文档问答（企业内部知识库RAG）
```

---

## 常用的组件及说明

### AI应用开发框架

| 名称 | 类型 | 说明 |
|:---|:---|:---|
| **LangChain** | Agent/RAG框架 | 最流行的LLM应用开发框架，支持链式调用和工具集成 |
| **LlamaIndex** | RAG框架 | 专注于文档索引和检索增强生成 |
| **Semantic Kernel** | Agent框架 | 微软出品，与LangChain类似，支持多语言（C#/Python/Java） |
| **Dify** | 低代码平台 | 可视化AI工作流编排，开箱即用的RAG能力 |
| **FastAPI** | API框架 | Python后端框架，AI模型部署首选 |
| **Gradio** | 演示框架 | 快速构建AI模型Web演示界面 |

### 大语言模型（LLM）

| 模型 | 厂商 | 特点 |
|:---|:---|:---|
| GPT-4/GPT-5 | OpenAI | 综合能力最强，闭源 |
| Claude 3.5/4 | Anthropic | 长上下文、安全性高 |
| Gemini | 谷歌 | 多模态原生 |
| DeepSeek-V3/R1 | 深度求索 | 开源、推理能力强、性价比高 |
| Qwen 2.5 | 阿里 | 中文优化，支持长上下文 |
| Llama 3 | Meta | 开源生态最完善 |

### 部署推理框架

| 名称 | 说明 |
|:---|:---|
| **vLLM** | 高性能LLM推理引擎，PagedAttention技术 |
| **TensorRT-LLM** | NVIDIA官方推理优化框架 |
| **Ollama** | 本地一键运行开源模型 |
| **SGLang** | 高效结构化生成框架 |

---

## 用Java实现

### 1. Spring AI 集成OpenAI

```xml
<!-- pom.xml -->
<dependency>
    <groupId>org.springframework.ai</groupId>
    <artifactId>spring-ai-openai-spring-boot-starter</artifactId>
    <version>1.0.0-M4</version>
</dependency>
```

```yaml
# application.yml
spring:
  ai:
    openai:
      api-key: ${OPENAI_API_KEY}
      base-url: ${OPENAI_BASE_URL}
      chat:
        options:
          model: gpt-4
          temperature: 0.7
```

```java
@Service
public class AIService {
    
    @Autowired
    private OpenAiChatModel chatModel;
    
    // 基础对话
    public String chat(String message) {
        ChatResponse response = chatModel.call(
            new Prompt(message)
        );
        return response.getResult().getOutput().getContent();
    }
    
    // 带系统提示词
    public String chatWithSystem(String userMessage) {
        List<Message> messages = List.of(
            new SystemMessage("你是一个Java技术专家，用中文回答"),
            new UserMessage(userMessage)
        );
        return chatModel.call(new Prompt(messages))
            .getResult().getOutput().getContent();
    }
}
```

### 2. Java调用Ollama本地模型

```xml
<dependency>
    <groupId>io.ollama</groupId>
    <artifactId>ollama4j</artifactId>
    <version>1.0.75</version>
</dependency>
```

```java
public class OllamaExample {
    public static void main(String[] args) throws Exception {
        OllamaConnection connection = 
            new OllamaConnection(new OllamaHttpClient("http://localhost:11434"));
        
        OllamaClient client = new OllamaClient(connection);
        
        // 设置模型（需先下载：ollama pull deepseek-coder）
        client.setModel("deepseek-coder");
        
        // 生成回复
        String response = client.generate("用Java写一个单例模式");
        System.out.println(response);
    }
}
```

### 3. Java + LangChain4j

```xml
<dependency>
    <groupId>dev.langchain4j</groupId>
    <artifactId>langchain4j-open-ai</artifactId>
    <version>1.0.0-beta1</version>
</dependency>
```

```java
public class RAGExample {
    public static void main(String[] args) {
        // 创建嵌入模型
        EmbeddingModel embeddingModel = 
            new OpenAiEmbeddingModel(OpenAiEmbeddingModelConfig.builder()
                .apiKey(System.getenv("OPENAI_API_KEY"))
                .build());
        
        // 创建向量存储（内存版）
        EmbeddingStore<TextSegment> store = 
            new InMemoryEmbeddingStore<>();
        
        // 构建RAG链
        ChatLanguageModel model = OpenAiChatModel.withApiKey(
            System.getenv("OPENAI_API_KEY")
        );
        
        String answer = model.chat(
            "根据文档回答：Spring AI是什么？"
        );
    }
}
```

### 4. NL2SQL 实现（阿里Spring AI Alibaba）

```xml
<dependency>
    <groupId>com.alibaba.cloud.ai</groupId>
    <artifactId>spring-ai-alibaba-nl2sql</artifactId>
    <version>1.0.0</version>
</dependency>
```

```java
@RestController
public class NL2SQLController {
    
    @Autowired
    private NL2SQLService nl2sqlService;
    
    @PostMapping("/chat2sql")
    public String chat2sql(@RequestParam String question) {
        // 自然语言转SQL
        String sql = nl2sqlService.generateSQL(question);
        // 执行SQL并生成自然语言回复
        return nl2sqlService.executeAndExplain(sql);
    }
}
```

---

## 用Python实现

### 1. 基础LLM调用（OpenAI）

```python
from openai import OpenAI

client = OpenAI(
    api_key="your-api-key",
    base_url="https://api.openai.com/v1"
)

response = client.chat.completions.create(
    model="gpt-4",
    messages=[
        {"role": "system", "content": "你是一个Java面试官"},
        {"role": "user", "content": "说说Spring Boot和Spring的区别"}
    ],
    temperature=0.7
)

print(response.choices[0].message.content)
```

### 2. LangChain 快速上手

```python
from langchain_openai import ChatOpenAI
from langchain.memory import ConversationBufferMemory
from langchain.chains import ConversationChain

# 初始化模型
llm = ChatOpenAI(model="gpt-4", temperature=0.7)

# 添加记忆
memory = ConversationBufferMemory()

# 创建对话链
conversation = ConversationChain(
    llm=llm,
    memory=memory
)

# 多轮对话
print(conversation.predict(input="你好，我是张三"))
print(conversation.predict(input="我叫什么名字？"))  # 会记住
```

### 3. RAG（检索增强生成）实现

```python
from langchain_community.document_loaders import TextLoader
from langchain.text_splitter import CharacterTextSplitter
from langchain_openai import OpenAIEmbeddings
from langchain_community.vectorstores import Chroma
from langchain.chains import RetrievalQA

# 1. 加载文档
loader = TextLoader("./knowledge.txt")
documents = loader.load()

# 2. 切分文档
text_splitter = CharacterTextSplitter(chunk_size=500, chunk_overlap=50)
docs = text_splitter.split_documents(documents)

# 3. 向量化并存储
embeddings = OpenAIEmbeddings()
vectorstore = Chroma.from_documents(docs, embeddings)

# 4. 构建RAG问答链
qa_chain = RetrievalQA.from_chain_type(
    llm=ChatOpenAI(),
    retriever=vectorstore.as_retriever()
)

# 5. 问答
answer = qa_chain.invoke("根据文档，Spring AI支持哪些功能？")
```

### 4. 本地模型（Ollama + LangChain）

```python
from langchain_community.llms import Ollama

# 确保已运行：ollama run deepseek-coder:6.7b
llm = Ollama(model="deepseek-coder:6.7b")

response = llm.invoke("用Python实现快速排序")
print(response)
```

### 5. FastAPI部署模型

```python
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from openai import OpenAI

app = FastAPI(title="AI服务API")

class ChatRequest(BaseModel):
    message: str
    model: str = "gpt-4"

class ChatResponse(BaseModel):
    reply: str
    tokens_used: int

client = OpenAI()

@app.post("/chat", response_model=ChatResponse)
async def chat(request: ChatRequest):
    try:
        response = client.chat.completions.create(
            model=request.model,
            messages=[{"role": "user", "content": request.message}]
        )
        return ChatResponse(
            reply=response.choices[0].message.content,
            tokens_used=response.usage.total_tokens
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# 启动：uvicorn main:app --reload
```

### 6. 图像识别（Hugging Face）

```python
from transformers import pipeline

# 加载预训练模型
classifier = pipeline("image-classification", 
                      model="google/vit-base-patch16-224")

# 识别图片
result = classifier("cat.jpg")
print(result)  # [{'label': 'tabby cat', 'score': 0.89}]
```

---

## Java vs Python AI开发生态对比

| 维度 | Python | Java |
|:---|:---|:---|
| **模型训练** | ✅ 绝对主流（PyTorch/TF） | ❌ 极少使用 |
| **模型推理** | ✅ 成熟（vLLM/TGI） | ⚠️ 可用（DeepSpeed Java/ONNX） |
| **RAG应用** | ✅ LangChain/LlamaIndex | ⚠️ LangChain4j（生态较新） |
| **企业集成** | ⚠️ 需要适配层 | ✅ Spring AI原生支持 |
| **微服务部署** | ⚠️ FastAPI可以 | ✅ Spring Cloud全家桶 |
| **学习曲线** | 平缓 | 陡峭 |

**选型建议：**
- **研究/训练/快速原型** → Python
- **企业级Java微服务集成AI能力** → Spring AI + Java
- **高性能推理服务** → Python（vLLM）或 C++/Rust

---

## 快速学习资源

| 类型 | 名称 | 地址 |
|:---|:---|:---|
| 课程 | 李沐《动手学深度学习》 | https://zh.d2l.ai |
| 课程 | Fast.ai | https://www.fast.ai |
| 博客 | Lilian Weng的博客 | https://lilianweng.github.io |
| 文档 | LangChain官方文档 | https://python.langchain.com |
| 文档 | Spring AI官方文档 | https://spring.io/projects/spring-ai |
| 社区 | Hugging Face | https://huggingface.co |
```

这份文档涵盖了：
1. **AI概念**：定义和三个层次
2. **底层原理**：神经网络数学原理 + Transformer架构
3. **业务场景**：各行业应用 + 开发场景
4. **组件清单**：框架、模型、部署工具
5. **Java实现**：Spring AI + Ollama4j + LangChain4j + NL2SQL
6. **Python实现**：OpenAI API + LangChain + RAG + FastAPI + HF

可以直接复制到你的.md文件中使用。需要我补充某个具体模块吗？