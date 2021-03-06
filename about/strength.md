# 4.1版本强度本位资源计量

## 预备知识
首先解释一下本文中使用的一些概念以及用语。
* 宝石：宝石指代的是School Idol Skill技能。
* 强度：卡片强度衡量的是卡片对总分的贡献度，其他条件不变的情况下，卡片强度越高，歌曲的总得分就越高。卡片强度的定义是：卡片的属性（包括绊，宝石）+技能等效强度。（与歌曲不同色、不同团将被视为debuff从强度中扣除）
单卡的通用强度可以在LLhelper卡片数据与通用强度中查到；若自己的实际情况与通用强度有出入，则可使用LLhelper队伍强度与得分计算来进行计算。
* exp：本文中exp统一指技能经验，而打歌时获得的经验值在本文则将用汉字表示。
* step up限定：指的是生日单人限定中，第一发30[心]，第二发40[心]（保底SR），第三发50[心]保底SSR的限定。

## 整套体系的构建
### 假设

我们先对这个玩家的情况做一些假设：
* 玩家等级：200。
* 玩家对有多种用途的资源的分配：
* [心]：打传统活动至50000（假设一切活动均为10天），sm135000（1档），mf160000，cf165000（1档），余[心]先抽单人step up限定第一发，再抽单人step up限定后两发，再抽主卡池加分[UR]概率up。（事实上，将活动pt调整为传统40000/其余100000或者更低，求出的本位制是不变的）
* [招募券]：抽主卡池加分[UR]概率up。
* [辅助券]：抽技能卡。
* [R贴纸]：先用于换每月4次商店里的SR技能卡，余下的换[辅助券]。
* [SR贴纸]：用于换[辅助券]。
* [UR]：奶判[UR]用于在贴纸商店换取加分[UR]，而加分[UR]中，抽到的部分用于培养，3换1换到的部分用于刷exp（参考此贴）。
* [金币]：为了方便起见，本攻略不讨论金币。这里假设该玩家购买了MF和CF的活动pt提升和MF的必出应援道具。
玩家卡组强度：抱腿82500，不抱腿75000。
玩家触力：比较触，能够FC几乎全部master。
玩家氪金度：不氪金。
$$100\text{LP}=0.670900\text{R贴纸}+5.198945\text{exp}+0.002802\text{辅助券}$$
