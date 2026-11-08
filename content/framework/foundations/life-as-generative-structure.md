---
title: "生命作为生成结构：核心理论版 V2"
description: "从关系更新、持续执行到扰动恢复，提出EGBE工作定义、三变量桥接模型与待执行的验证计划。"
author: "SL"
version: "0.2.2"
created: "2026-09-28"
updated: "2026-11-08"
published: "2026-11-01"
publish: true
kind: article
aliases:
  - framework/life-as-generative-structure
---

## 阅读起点：生命不只是材料，也涉及组织如何延续

同样的物质成分，以不同关系组织起来，可能具有完全不同的持续能力。本文从这个问题出发：哪些过程不断更新系统赖以存在的关系？关系闭合是否足以持续？面对扰动还能否恢复？过去的活动又会怎样改变以后的恢复条件？

这里暂时搁置“物质还是信息是宇宙本原”的争论，选择一个可建模的关系视角。它不意味着已经完整定义了生命，也不要求每个活体无限存续、不断扩张环境或提高鲁棒性。实际研究还需说明对象是细胞、个体、谱系、群落还是人工系统，以及它与繁殖、演化和物理资源的关系。

**EGBE**（Endogenous Generative Basin Expansion）在本文指“内生生成性恢复范围扩展”：标准化当前系统后，它过去活动留下的环境结构，是否使更多指定扰动仍可恢复。这个问题比“生命会改变环境”更窄，也允许答案是否定的。

| 层次 | 本文要问的问题 | 当前地位 |
| --- | --- | --- |
| 关系结构 | 哪些过程建立和更新核心组织关系？ | 建模视角，借用已有组织理论 |
| 持续执行 | 抽象模型中是否存在反复更新全部角色的执行？ | 指定模型假设下的形式性质 |
| 鲁棒维持 | 面对明确扰动集合，是否存在可执行的持续策略？ | 需要模型、信息与控制条件 |
| EGBE | 历史活动留下的结构是否扩大指定恢复范围？ | 待检验候选性质，不是全部生命的定义条件 |
| 桥接模型与实验 | 能否得到可重复的剂量、时间和冲击响应？ | 现象学模型及尚未执行的研究设计 |

读者可以先看第1部分的五个反例，再读第3部分的EGBE定义；第4—5部分给出模型与实验接口，第6部分列出来源、候选贡献和未解决问题。

## 0. V2 的核心收缩

V1 最大的问题不是数学错误，而是**结构理论、动力学模型和微生物实验没有真正连成一条逻辑链**。V2 因此做四个修正。

1. **术语改名。** 不再使用 *Generative Entrenchment*，避免与Wimsatt及后续研究中的同名概念混淆。本文候选概念改称：

**Endogenous Generative Basin Expansion (EGBE)**

2. **新颖性降级。** Petri nets、closure of constraints、Constructor Theory、viability/capture basin、Büchi games、option-set monotonicity 都视为可继承的前人基础。我们不再把“自由度增加则 winning region 不缩小”包装成新命题。

3. **Bridge Model 回到正文。** 结构理论与实验之间加入一个明确的 mesoscopic coarse-graining：它不声称由 Petri net 唯一推出，而是把“core relation renewal”投影成可测的 generative functional state，并显式加入 beneficial environmental memory 与 self-generated toxicity。

4. **实验直接检验模型。** Primary observable 改为 recovery probability curve 和 critical shock boundary：

$$
\boxed{q_{50}(\rho,\Delta)}
$$

其中 $\rho$ 是 conditioned environment 的剂量，$\Delta$ 是环境记忆老化时间。恢复盆面积只保留为 secondary summary。

本文拟检验的核心逻辑因此变成：

$$
\boxed{
\text{Relational Structure}
\rightarrow
\text{Computable Bridge Model}
\rightarrow
\text{Dose–Response Prediction}
\rightarrow
\text{Falsification Experiment}
}
$$

---

## 1. 最小结构：生命先被视为哪一类关系系统？

### 1.1 暂时搁置 matter 与 information ontology

当前不预设宇宙最基础的是 matter、information、field 或任何特定 substrate。只保留：

- organization-defining relation / constraint roles；
- 使这些 roles 被建立、替换、修复的 processes；
- relations 与 processes 之间的 causal dependence；
- 在扰动下是否仍能反复实现这些 roles。

因此研究对象不是“某一种东西”，而是一个 typed incidence structure：

$$
\boxed{\mathfrak P=(\mathcal C,\mathcal P,\mathrm{Pre},\mathrm{Post},\mu)}
$$

其中 $\mathcal C$ 是核心关系角色，$\mathcal P$ 是 renewal processes，$\mu$ 是当前organizational marking（组织标记）。这里用 $\mu$ 避免与后文的环境记忆 $m(t)$ 混用。一个最小 renewal 单元不是 $x\to x$，而是：

$$
\boxed{C_i\rightarrow p_j\rightarrow C_k'}
$$

并要求 $C_k'$ 在组织角色上等价于 $C_k$。加入 multiplicity 后，得到普通 Petri-net / reaction-network 形式；这只是表达语言，不是本文原创。

### 1.2 五个反例决定了定义必须有多强

1. **摆钟反例。** “状态反复回来就是 generative” 被淘汰：recurrence ≠ endogenous relational renewal。
2. **AND/OR 反例。** pairwise graph 不足：joint dependence 需要 hyperedge / incidence。
3. **耗尽反例：** $2A\to B,\ 2B\to A$。有闭环仍会耗尽，因此 structural closure ≠ sustainable renewal。
4. **Deadlock 反例：** $2A\to2B,\ 2B\to2A$ 且 $\mu_0=(1,1)$。存在平衡 flux 仍无法启动，因此 algebraic feasibility ≠ reachability。
5. **good/bad disturbance 反例。** 存在一条恢复路径不等于 robust，因此 existential path ≠ winning strategy。

这些反例把理论压成三个不同层级，而不是把“closure”当成万能解释：

$$
\boxed{
\text{Structure}
\rightarrow
\text{Persistent Execution}
\rightarrow
\text{Robust Winning}
}
$$

### 1.3 模型内的严格结果：有限 self-covering 证书

先定义一个布尔谓词 $\mathrm{RenewAll}(w;\mathcal C_*)=1$，表示有限 firing word $w$ 至少重新实现一次每个核心 role。定义 Repeatable Generative Regime：

$$
\mathcal R_G=
\left\{
 \mu:\exists w,\ \mu\xrightarrow{w}\mu'\ge \mu,\ \mathrm{RenewAll}(w;\mathcal C_*)=1
\right\}.
$$

这里将 $\mathrm{Persistent}_G(\mu_0)$ 定义为：存在一条从 $\mu_0$ 出发的无限执行，使每个核心角色都被无限次更新。核心角色有限，并由预先固定的变迁事件标签判断是否完成更新，不能在看到结果后重新指定。

对有限库所、有限变迁的标准P/T Petri抽象（允许非负整数弧权），在没有抑制弧、重置弧或额外容量上界等破坏单调性的条件下，有模型内判据。下式的 $w$ 是非空有限字，比较标记时按每个分量比较：

$$
\boxed{
\mathrm{Persistent}_G(\mu_0)
\iff
\exists \mu^*,w:\ \mu_0\to^*\mu^*\xrightarrow{w}\mu^+\ge \mu^*,\ \mathrm{RenewAll}(w;\mathcal C_*)=1
}
$$

这把模型中的一种“无限持续”性质压缩成有限见证，依赖已有Petri-net/VASS单调性与良拟序思想，不能作为本文的新数学贡献。相关基础可查[Esparza的Petri网讲义](https://www.cse.iitb.ac.in/~akshayss/courses/cs735/Esparza-lecture-notes.pdf)。

**论证要点。** 若存在自覆盖更新字，单调性允许从覆盖后的标记再次执行同一个字，因而每个核心角色可以重复更新。反过来，若无限执行反复更新所有有限个核心角色，可以按“完成一轮全部更新”划分片段，再对各轮起始标记应用Dickson引理，找到前后可比较的两个标记，得到包含完整更新的自覆盖片段。

这项条件性论证尚未证明某个真实系统被忠实地抽象为该网，也没有证明模型的无限执行对应无限物理时间、真实资源供给或生命身份。若另加允许集合K，自覆盖字的重复还可能越过K的上界；此时必须单独检验带约束的持续执行，不能直接沿用上式。

---

## 2. 从“有活路”到“面对扰动仍有路”

### 2.1 Generative Capture Basin

设K是允许的组织状态集合。把能够在K内持续更新全部核心角色的目标状态集记为 $\mathcal R_{G,K}$。它需要连同K、动力学和允许动作一起确定，不能只检查一次自覆盖就默认以后也满足K。定义：

$$
\boxed{\mathcal B_G=\operatorname{Capt}(K,\mathcal R_{G,K})}
$$

它表示：

> 从哪些状态出发，至少存在一条允许路径，可以到达可重复的 generative regime。

因此 $\mathcal B_G$ 只回答 existential question：**有没有一条恢复路径？**

### 2.2 Robust Generative Winning Region

如果环境可施加 disturbance $d$，系统可选择 response $u$，则 robust generativity 的量词是：

$$
\boxed{\exists\pi\ \forall(d_0,d_1,d_2,\ldots)}
$$

存在一套 strategy $\pi$，使所有 admissible disturbance histories 下：

1. 系统不离开 safe set $K$；
2. 每个核心 relation role 都被无限次 renewal。

若已经给定相应的博弈图、可观察信息、允许扰动以及各角色的接受事件，这可以编码为带安全条件的广义Büchi目标。策略必须只使用当时可获得的信息，无法继续执行的死锁不能算作满足无限更新。[相关广义Büchi博弈研究](https://arxiv.org/abs/1607.05850)提供形式基础；它不意味着任意真实或无限状态系统都已获得可计算解。定义：

$$
\boxed{\mathcal W_G^{\mathrm{rob}}}
$$

为鲁棒生成性获胜区域。在相同动力学、约束、角色及相容的扰动条件下，鲁棒策略至少给出一条允许的持续路径，因此有：

$$
\boxed{\mathcal W_G^{\mathrm{rob}}\subseteq\mathcal B_G.}
$$

这里的 Büchi/game 数学本身是成熟理论。它在本文中的作用是把“robust life-like generativity”从模糊韧性语言改写成明确量词：

> **不是有没有一条好路径，而是有没有一套策略能对付一整类坏路径。**

---

## 3. 核心候选性质：EGBE

### 3.1 为什么 V1 的“architecture 改变”还不够

V1 写成：

$$
\theta_t\to\theta_{t+1},
\qquad
\mathcal B_G(\theta_t)\subsetneq\mathcal B_G(\theta_{t+1}).
$$

但任何 $\theta$ 都可以并入更大的状态：

$$
y=(x,\theta).
$$

于是所谓“改变 game”可能只是扩展状态空间中的普通运动。因此 EGBE 不能靠“$\theta$ 会变化”本身获得非平凡性。

### 3.2 操作性定义：标准化当前系统，只保留历史留下的外部结构

我们显式 factorize：

$$
\boxed{Y=X\times\Theta}
$$

其中：

- $X$：当前 generative organization 的即时状态；
- $\Theta$：由过去活动形成、会改变未来 $X$-dynamics 的 persistent contextual structure。

关键不是声称 $\Theta$ “不属于状态”，而是做一个可干预比较：

$$
\boxed{do(X=x^*)}
$$

把当前系统强行标准化为同一个 $x^*$，只让历史产生的 $\Theta$ 不同。

设 $\theta_H$ 是由过去 generative activity 产生的历史环境，$\theta_0$ 是匹配的 baseline。定义 $\mathrm{Rec}(x^*,\theta,q)=1$ 表示从标准化当前状态 $x^*$ 施加扰动 $q$ 后仍能恢复 persistent generativity。于是：

$$
\mathcal Q_G(x^*,\theta)
=
\{q\in\mathcal Q:\mathrm{Rec}(x^*,\theta,q)=1\}.
$$

若：

$$
\boxed{
\mathcal Q_G(x^*,\theta_H)
\supsetneq
\mathcal Q_G(x^*,\theta_0)
}
$$

且 $\theta_H$ 的差异可因果归因于此前该 generative system 的活动，则称为：

**Endogenous Generative Basin Expansion (EGBE)**

这个定义承认：在更大的 $(X,\Theta)$ 空间中，一切仍然可以按普通动力学描述。候选增量是一种待比较的操作性因果性质：过去的生成活动，是否通过持续语境结构，扩大当前系统被标准化后仍可恢复的扰动集合。

**定义边界。** EGBE不是本文宣称的所有生命的必要条件，也不是充分的生命鉴别测试。它可能缺席于某些生命式系统，或存在于人工与非生物系统。当前研究对象是可检验的组织性质，而不是宣告已解决生命定义。

严格集合包含要求原有可恢复扰动仍可恢复，并至少新增一种。单个阈值上移、平均恢复率提高，或一种冲击下改善，都不足以证明完整集合严格扩大。若部分冲击改善、另一些恶化，应报告权衡。实际实验也只能对覆盖到的扰动范围给出有限证据。

把当前状态标准化为 $x^*$ 是理想化干预。真实研究通常只能匹配测到的状态和接种条件；应记录未观测差异、随机分配及批次影响，不能把“使用相同接种物”直接当成完整的 $do(X=x^*)$ 已实现。

### 3.3 Robust EGBE 暂不由本文实验检验

更强版本要求：

$$
\mathcal W_G^{\mathrm{rob}}(\theta_H)
\supsetneq
\mathcal W_G^{\mathrm{rob}}(\theta_0).
$$

这需要 adversarial / repeated disturbance protocol 与 winning-strategy identification。本文下面的微生物实验**只能检验 existential/probabilistic EGBE，不检验 Robust EGBE**。

---

## 4. Bridge Model v0.2：结构理论如何落到可测预测

### 4.1 Coarse-graining：$g$ 不是 biomass，而是“核心关系整体恢复程度”

对结构模型中的核心 roles $C_1,\ldots,C_r$，设每个 role 有标准化 renewal score $r_i(t)\in[0,1]$。定义一个保守的 coarse-grained order parameter：

$$
\boxed{g(t)=\min_i r_i(t)}
$$

因此只有当所有关键 relation roles 都恢复时，$g$ 才高。实际实验可以用更平滑的 aggregation，但必须预注册并保持“最弱核心关系不能被平均掉”这一原则。

Bridge Model 不声称从 Petri structure 唯一推导出来；它只是一个 phenomenological projection，用来产生可失败的定量预测。

### 4.2 三变量模型：beneficial memory + self-generated toxicity

设：

- $g(t)$：当前 generative functional state；
- $m(t)$：过去活动留下的 beneficial environmental memory；
- $z(t)$：过去活动留下的 inhibitory / self-toxic legacy；
- $q$：外部 shock intensity。

采用最小模型：

$$
\boxed{
\dot g
=
 g\,[r_0-aq+\lambda m-\xi z^2-\kappa g]
}
$$

$$
\boxed{
\dot m=\beta g(1-m)-\eta m
}
$$

$$
\boxed{
\dot z=\gamma g-\delta z
}
$$

这里 $m$ 和 $z$ 都由过去 $g$ 的活动内生产生，但对未来 $g$ 的作用方向相反。这个自抑制项让候选模型允许历史活动造成损害；它是本版选择的建模方式，不表示所有系统都具有相同的二次毒性函数。

这里的方程是经验桥接模型，并非从 $g=\min_i r_i$ 的定义严格推出。参数需明确单位、非负性与拟合范围，取 $a>0$、$q\ge0$。如果g直接解释为0—1归一化评分，还需保证该区间正不变；例如在其他系数非负、初值满足范围且 $\kappa\ge r_0+\lambda$ 时，上边界的导数不会向外。若实际参数不支持这种解释，应调整模型或将g重新定义为非负功能强度，不把不受限的解直接当作评分。

由于第一条方程含有g因子， $g(0)=0$ 时该模型不会自行恢复。它描述存在残余功能或活动种子的恢复过程，不描述生命从绝对零功能中起源。

### 4.3 Conditioned-environment dose 与 aging

实验把历史 conditioned environment 按比例 $\rho\in[0,1]$ 与 matched fresh environment 混合。若 conditioned medium 在去除活细胞后老化 $\Delta$ 时间，则初始历史变量近似为：

$$
m(0)=\rho m_H e^{-\eta\Delta},
\qquad
z(0)=\rho z_H e^{-\delta\Delta}.
$$

在恢复早期、$g$ 尚低时，净增长边界近似由：

$$
r_0-aq+\lambda m(0)-\xi z(0)^2=0
$$

给出。若 $s(q)=aq$，得到可计算的 critical shock：

$$
\boxed{
q_c(\rho,\Delta)
=
\frac{
 r_0
 +\lambda\rho m_H e^{-\eta\Delta}
 -\xi\rho^2 z_H^2 e^{-2\delta\Delta}
}{a}
}
$$

上式是低g、早期近似下的净增长阈值，不是完整非线性系统的全局恢复边界。长期恢复仍取决于初始g、后续m和z、噪声、目标及观察期限。

实验中的 $q_{50}$ 是恢复概率曲线上对应50%的统计阈值，与 $q_c$ 不是同一个量。只有在观测范围内存在可识别的相应交点时才报告；若曲线不单调、交点不唯一或没有覆盖50%，应报告这些情况及不确定性，不能强行外推一个边界。

### 4.4 四个直接预测

#### Prediction 1 — 低剂量历史环境应移动 shock boundary

在模型假设成立且 $\lambda m_H>0$ 时，固定老化时间，在 $\rho\approx0$：

$$
\left.\frac{\partial q_c}{\partial\rho}\right|_{\rho=0}
=
\frac{\lambda m_H e^{-\eta\Delta}}{a}>0.
$$

因此 primary prediction 不是“平均恢复更高”，而是 recovery curve 沿 shock axis 发生可测位移。

#### Prediction 2 — 自毒允许 inverted-U，而不是强行要求单调变好

因为 $-\xi z^2$，高 conditioned dose 可能削弱甚至反转低剂量优势。若最优剂量落在 $0<\rho^*<1$：

$$
\boxed{
\rho^*
=
\frac{\lambda m_H e^{-\eta\Delta}}
{2\xi z_H^2 e^{-2\delta\Delta}}
}
$$

因此高剂量下反转是该参数化允许的现象。但在 $\lambda m_H>0$ 已固定的条件下，足够低剂量处应有正斜率；平坦或负的低剂量结果可能反驳这一条件版本，不能将任何曲线形状都解释成成功。

#### Prediction 3 — Environmental memory 应有时间尺度

在低剂量、toxicity 可忽略区域：

$$
\Delta q_c(\rho,\Delta)
\approx
\frac{\lambda\rho m_H}{a}e^{-\Delta/\tau_m},
\qquad
\tau_m=\frac1\eta.
$$

用 community generation / renewal time $\tau_G$ 归一化后，真正跨代的 externalized memory 应表现为对 $\Delta/\tau_G$ 的系统依赖，而不是只在即时条件下出现。

#### Prediction 4 — 控制即时资源后的残余记忆：一个更窄的检验

一般EGBE定义允许环境历史通过资源、pH或其他条件起作用，只要满足所声明的因果比较与恢复集合要求。下文实验另外选择更窄的问题：在匹配当前系统并控制主要即时理化条件后，是否仍存在可重复的历史结构效应？

如果匹配后效应消失，这会削弱“超出已匹配资源条件的残余记忆”版本，并帮助定位机制；它不能单独否定一般EGBE或生命的组织关系视角。匹配操作也可能移除真正的中介因素，应事先说明估计的是总效应还是残余效应。

---

## 5. 拟开展的可失败实验：尚未执行

### 5.1 实验系统设想：定义明确的 synthetic microbial consortium

首个实验不应使用高度复杂、关系角色无法测量的天然群落。选择一个可重复的 synthetic consortium，并在实验前指定至少三个 **core relation roles**，例如：

- $C_1$：substrate conversion / cross-feeding flux；
- $C_2$：互补代谢或 detoxification relation；
- $C_3$：environment-conditioning / extracellular support relation。

关键是：$C_i$ 是**功能关系角色，不是物种名字**。不同成员丰度可以变化，只要预注册的关系角色被重新实现。

定义 structural recovery：所有 core-role scores $r_i$ 均恢复到预注册阈值，并持续 $k$ 个 serial transfers。Biomass 和总功能只作为 secondary endpoints；不能再用“biomass 80%、功能 90%”替代结构恢复。

### 5.2 Conditioned environment 的制备与平凡解释控制

历史群落先运行足够长时间得到 conditioned environment $E_H$。随后：

1. 以经验证的方式去除活细胞，并检测残留生物活动等替代解释；
2. 测量并匹配 pH、osmolarity、主要无机离子与已知 limiting nutrients；
3. 必要时补回消耗的基础营养，使 $E_H$ 与 fresh control $E_0$ 在这些变量上匹配；
4. 保留未经指定“擦除”的 extracellular/metabolite/environmental history；
5. 用同一标准化 inoculum $C_0$ 接种，执行 $do(C=C_0)$ 式比较。

另设 **memory-erased control**：在尽可能保持即时资源相同的前提下去除/破坏候选历史结构。它用于因果辨别，但“擦除”也可能改变未测量的环境性质。需要相应假处理对照、干预特异性验证，必要时比较恢复候选因素后的结果；一次擦除实验不足以自动识别唯一机制。

### 5.3 Primary design：dose × aging × shock

三个连续自变量：

- conditioned dose：$\rho\in\{0,0.25,0.5,0.75,1\}$；
- aging delay：$\Delta/\tau_G\in\{0,1,2,4,8\}$（可据系统调整）；
- shock intensity：$q$ 取足够多梯度，以完整覆盖 recovery probability 从接近 1 到接近 0 的区间。

原稿列出的剂量和老化网格是候选设计，尚非经过功效分析的固定方案。执行前需冻结角色测量、恢复阈值、观察期限、批次与独立重复单位、样本量、排除规则及最小有意义效应。同批多孔不能默认都是独立生物重复，测量和分析可尽量盲于处理。Primary outcome 是：

$$
\boxed{P_{\mathrm{recover}}(q\mid\rho,\Delta)}
$$

并用预注册模型估计：

$$
\boxed{q_{50}(\rho,\Delta)}
$$

即恢复概率为 50% 的 shock boundary。

二维 shock grid（例如 salinity × dilution）可作为 secondary analysis，用于重建近似 recoverable region，但不再把其任意矩形内面积作为 primary endpoint。

### 5.4 直接对应 Bridge Model 的统计检验

第一阶段可用 logistic recovery model：

$$
\operatorname{logit}P_{\mathrm{recover}}
=
\alpha_0
-\alpha_q q
+\alpha_1\rho e^{-\Delta/\tau_m}
-\alpha_2\rho^2 e^{-2\Delta/\tau_z}
+\text{batch effects}.
$$

其中：

- $\alpha_1>0$ 对应 beneficial externalized memory；
- $\alpha_2>0$ 对应 high-dose inhibitory legacy；
- $\tau_m$、$\tau_z$ 给出历史效应的持久时间尺度。

该式是第一版待检验统计参数化，尚未证明参数在拟议设计中可识别。正负效应、两个衰减时间尺度和批次差异可能混淆；应检查识别性、参数区间、替代模型与拟合外预测，不用方程的存在代替这些工作。

### 5.5 预注册的失败条件

本计划尚未完成正式预注册。对于已经事先声明的“低剂量正向残余记忆及其衰减模型”，以下结果会构成失败、削弱或需要重新定位的证据。结论应对应具体主张，不能将单个阴性实验推广为对一般EGBE的否定：

1. 在合理 power 下，$q_{50}(\rho,\Delta)$ 对低剂量 $\rho$ 没有正向位移，且置信区间排除预注册最小效应；
2. 环境优势在pH、营养和渗透条件匹配后消失：削弱残余记忆版本，支持考察这些已匹配条件的中介作用；
3. 标准化当前 community 后，历史环境不能预测 structural core-role recovery；
4. 在足够宽且有测量能力的老化范围内，结果不支持事先指定的衰减模型：削弱该时间尺度假说，不能仅凭“没有看见衰减”断言不存在更持久的历史效应；
5. 经验证有效且具有所需特异性的候选记忆擦除不影响结果，简单资源补充却复制该效应：削弱被测试的残余记忆机制解释。

反过来，如果观察到可重复的 dose-response、history-aging law，并且 erase history 会消除 boundary shift，则获得的是：

$$
\boxed{
\text{past }G
\rightarrow
\Theta_H
\rightarrow
\Delta q_{50}
}
$$

这一因果链在已测试条件下的证据。还需排除干预副作用，并检查恢复集合是否符合相应定义。它不自动证明鲁棒EGBE、所有生命共有的性质，或跨尺度普遍定律。

---

## 6. 当前真正可以声称什么，不能声称什么

### 6.1 已知基础，不作为原创

本文列出的相关基础与邻近研究包括：

- Rosen relational biology / closure to efficient causation；
- Montévil–Mossio closure of constraints；
- RAF / reaction-network / Chemical Organization Theory；
- Petri-net self-covering、T-invariant、reachability 与 liveness；
- Constructor Theory 的 self-reproducer / replicator–vehicle；
- Aubin 系列 viability / capture-basin 理论；
- Büchi / generalized Büchi infinite-horizon games；
- niche construction、ecological inheritance 与 environmental memory。

因此关系闭合、自我复制、存活集合和在固定条件下增加可用动作的单调性，都不能直接作为新颖性主张。上述方向并不共享同一模型和假设；这里只说明理论来源与比较对象，未完成穷尽的文献查新。

### 6.2 当前仅保留两个候选增量

#### Candidate A — EGBE 作为可干预的跨尺度 causal property

不是“系统会改变环境”，而是：在当前 generative state 被标准化后，由该系统过去活动造成的 persistent contextual structure 是否扩大 **future recoverable perturbation set / boundary**。

其核心不是新数学，而是统一的 causal observable：

$$
\boxed{
\mathcal Q_G(x^*,\theta_H)
\supsetneq
\mathcal Q_G(x^*,\theta_0)
}
$$

#### Candidate B — Generativity hierarchy 作为跨尺度统一语言

$$
\boxed{
\text{Structural Renewal}
\rightarrow
\text{Persistent Execution}
\rightarrow
\text{Robust Winning}
\rightarrow
\text{Endogenous Basin Expansion}
}
$$

如果这套 hierarchy 能在 cell、organism、lineage、ecosystem、biosphere 和 artificial generative system 中保持同一数学含义，并带来跨领域新预测，才具有真正理论价值。

### 6.3 当前最重要的开放问题

1. **Bridge derivation**：能否从明确的 relation-renewal network 系统地导出 $g,m,z$ 的 coarse-grained dynamics，而不是经验设定？
2. **Extended-state nontriviality**：EGBE 是否能在不同 factorization 下保持足够稳定的 causal interpretation？
3. **Robust EGBE**：如何设计 repeated/adversarial perturbation experiment，直接估计 $\mathcal W_G^{\mathrm{rob}}$ 的变化？
4. **Cross-scale invariance**：EGBE 的操作定义能否跨 microbial consortium 与更高尺度系统保持不变？

---

## 7. 一句话版本

> **生命式 generativity 可以先被视为：一组组织关系通过内部过程持续重新实现自身；persistent generativity 是存在可重复 renewal regime；robust generativity 是存在能对抗扰动的 winning strategy；EGBE 则是一个更窄、更可检验的候选性质——在标准化当前系统状态后，过去由该系统活动留下的 contextual structure 是否扩大未来可恢复的扰动范围。**

如果桥接模型的剂量—反应与时间尺度预测在有足够辨别能力的控制研究中失败，应收缩或放弃相应参数化及条件假说，不能把任何结果都解释成成功。一般EGBE定义、某个机制版本和生命的关系视角需要分别评价；只有在多个载体和尺度上保持明确操作含义、优于可信替代解释并产生新预测，才适合继续推进更一般的生成结构研究。

---

## 附录 A：为什么改名 EGBE

William C. Wimsatt 至少自 1986 年起使用 **generative entrenchment** 描述 developmental systems 中早期结构因拥有大量 downstream dependencies 而更难改变的现象；该概念后来还被扩展到文化和组织系统。因此本文不再占用这一术语。

本文的 EGBE 指的是完全不同的对象：

$$
\boxed{
\text{system-produced historical context}
\rightarrow
\text{expansion of future generative recoverability}
}
$$

它必须通过当前-state standardization 与 intervention 进行操作化。

## 附录 B：理论来源与邻近研究

以下文献支持相邻概念或形式方法，不是对本文EGBE、桥接方程或实验结果的背书。

1. Montévil, M. & Mossio, M.（2015）：[Biological organisation as closure of constraints](https://montevil.org/publications/articles/2015-mm-organisation-closure-constraints/)。*Journal of Theoretical Biology*, 372, 179–191，DOI: 10.1016/j.jtbi.2015.02.029。
2. Marletto, C.（2015）：[Constructor theory of life](https://arxiv.org/abs/1407.0681)。*Journal of the Royal Society Interface*, 12, 20141226，DOI: 10.1098/rsif.2014.1226。
3. Aubin, J.-P., Bayen, A. M. & Saint-Pierre, P.（2011）：[Viability Theory: New Directions](https://link.springer.com/book/10.1007/978-3-642-16684-6)。
4. Esparza, J.：[Petri Nets: Lecture Notes](https://www.cse.iitb.ac.in/~akshayss/courses/cs735/Esparza-lecture-notes.pdf)。用于核查标记、可达性、覆盖与单调性基础。
5. Chatterjee, K., Dvořák, W., Henzinger, M. & Loitzenbauer, V.（2016）：[Conditionally Optimal Algorithms for Generalized Büchi Games](https://arxiv.org/abs/1607.05850)。
6. Wimsatt, W. C.（1986）：Developmental Constraints, Generative Entrenchment, and the Innate-Acquired Distinction。原稿列举的历史来源；同名概念及后续发展可参见Wimsatt与Schank的[Generative Entrenchment, Modularity and Evolvability](https://mechanism.ucsd.edu/~bill/ModelsAndPrediction/papers/wimsatt.Mod-evol-pardx-89POSTfin.pdf)作者稿。
7. Lee, E. D., Flack, J. C. & Krakauer, D. C.：[Outsourcing Memory Through Niche Construction](https://arxiv.org/abs/2209.00476)。用于比较环境改造与记忆的相关研究，不据此声称EGBE已被验证。

Rosen关系生物学、RAF及化学组织理论等在原研究稿中也是后续文献比较方向。本文不以仅列出名称代替逐项证明其假设、对应关系或创新差异。

## 附录 C：V1 中降级到附录的内容

以下内容不删除，但不再占据核心论证：

- Poincaré Lens 的完整方法论历史；
- Constructor Theory 的长篇逐项 mapping；
- Prochlorococcus / SAR11 对“控制边界总扩张”的压力测试；
- Generative Margin 的多个 scalar 候选；
- Category / operad 作为 compositional envelope 的讨论；
- self-covering theorem 的完整证明；
- robust Büchi fixed-point 的完整推导；
- 旧的 v0.1 数值模拟与 basin-area 结果。

这些材料继续保留在长篇研究档案中，作用是 provenance 与未来回溯，不作为 V2 的核心新颖性证据。


## 公开整理说明与相关阅读

本页以2026-09-28 Core v2.0为主体，保留七部分论证、模型公式、反例和拟议实验；公开整理版单独编号v0.1。补充了Petri抽象与允许集合的条件、评分变量范围、局部阈值与统计阈值的区别，以及一般EGBE和残余环境记忆检验的区别。

附录C所列证明、长篇映射与旧模拟是研究档案的追溯线索。本页没有提供或重新验证这些模拟，也没有把它们作为已复现的结果。原始研究文档保留，网站稿单独维护。

相关概念：[约束与未来选择](../book/constraints-and-future-options.md)、[表示与检验](../book/what-belongs-in-a-model.md)、[原创性与独立验证计划](../methods/originality-and-validation.md)。

---

<a id="research-notes"></a>

## 研究与版本说明

> **公开整理版 v0.1 · 生命的关系视角与研究假说。** 以2026-09-28《生命作为生成结构：核心理论版V2》（Core v2.0）为主体整理。本文未报告新实验数据，EGBE是候选性质，桥接模型与实验计划尚待验证；本页不是已经建立生命必要充分定义的宣言。
