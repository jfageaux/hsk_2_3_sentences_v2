Product Requirements Document – Modular Matrix‑Style Chinese‑Sentence Trainer v2

1. Goal

Build a lightweight, Matrix‑themed web app that shows five random Chinese sentences at a time. When the learner hovers / taps a single character, the app reveals that character’s pinyin and the full English translation of the sentence. Datasets (HSK 1‑4) must be swappable by dropping new JSON files into /data.

2. Success Criteria (80/20)


KPI	Target
Hover accuracy (char → pinyin)	100 %
Time to first render on 4 G	< 700 ms
Review throughput	≥ 50 chars per minute (keyboard‑only)
3. User Stories

• As a learner I see five large, green, randomly chosen HSK 2‑3 sentences.
• When I hover or tap a character, I instantly see its pinyin and the full English translation.
• When I click “Shuffle”, I get a fresh, non‑repeating batch until the full pool is exhausted.
• As a power user I can swap entire datasets by adding new JSON under /data without code edits.

4. Data Model

chars.json – one global dictionary (character → metadata)

{ "你": { "py": "nǐ", "mean": "you" }, "好": { "py": "hǎo", "mean": "good" }, … }

sentences_hsk2.json – sentence pool for this project

Each item:
• id – integer
• chars – full Chinese sentence string
• en – full English translation

The array is listed in section 6. Front‑end derives charKeys at runtime by splitting chars into individual code‑points (punctuation included), so no manual array needed.

5. High‑Level Architecture

/ public
 index.html
 / css  styles.css
 / js   main.js   dataService.js   uiService.js
 / data chars.json  sentences_hsk2.json  (plus optional other levels)


Layer	Responsibility
dataService.js	Fetch JSON, cache {char → meta}, serve five random sentences without repeats.
uiService.js	Render sentences as <span class="glyph" data-char="你">你</span>, bind hover / touch events, add scale / glow CSS classes.
main.js	Bootstrap, dataset selector, “Shuffle” button logic.
6. Dataset (sentences_hsk2.json content)

[
1  你好，最近忙吗？  Hi, have you been busy lately?
2  我叫Johnny，你呢？  My name is Johnny, how about you?
3  很高兴认识你。  Nice to meet you.
4  今天的天气很好。  The weather is great today.
5  你早上几点起床？  What time do you get up in the morning?
6  我需要一杯咖啡。  I need a cup of coffee.
7  请给我菜单。  Please give me the menu.
8  这个多少钱？  How much is this?
9  我在学习中文。  I am studying Chinese.
10  你可以慢一点说吗？  Could you speak more slowly?
11  请帮我写下来。  Please write it down for me.
12  我听不太懂。  I don’t quite understand.
13  没关系，我再试试。  It’s okay, I’ll try again.
14  厕所在哪里？  Where is the restroom?
15  请问可以刷卡吗？  May I pay by card?
16  这艘船几点到港？  What time does this ship arrive at the port?
17  这些箱子今天上船吗？  Are these boxes going on board today?
18  请把文件发给我。  Please send me the document.
19  我们需要检查重量。  We need to check the weight.
20  终端已经回复了。  The terminal has already replied.
21  这个计划有问题吗？  Is there any problem with this plan?
22  请在邮件里确认。  Please confirm in the email.
23  明天还有会议。  We have another meeting tomorrow.
24  船长想要最新的名单。  The captain wants the latest list.
25  这个集装箱危险吗？  Is this container dangerous?
26  我会发一张截图。  I will send a screenshot.
27  请在系统里更新。  Please update it in the system.
28  我们下午做复查。  We will do a review this afternoon.
29  你可以帮我翻译吗？  Can you help me translate?
30  这个号码打不通。  This number cannot be reached.
31  我晚上去健身房。  I’m going to the gym tonight.
32  我们一起练瑜伽吧。  Let’s do yoga together.
33  记得多喝水。  Remember to drink more water.
34  今天要练腿。  Today we need to train legs.
35  别忘了拉伸。  Don’t forget to stretch.
36  我的膝盖有点疼。  My knee hurts a little.
37  请给我体重数据。  Please give me the weight data.
38  我们跑五公里吧。  Let’s run five kilometres.
39  你的速度很快！  Your speed is very fast!
40  休息三十秒再做。  Rest for thirty seconds and then do it again.
41  我在用Ableton做音乐。  I’m making music with Ableton.
42  这个节奏不错。  This rhythm is nice.
43  声音需要更清楚。  The sound needs to be clearer.
44  请调低一点音量。  Please turn the volume down a bit.
45  我们试试这个和弦。  Let’s try this chord.
46  节拍器准备好了吗？  Is the metronome ready?
47  把鼓点放到四拍。  Put the drum beat on the fourth beat.
48  保存项目别忘了。  Don’t forget to save the project.
49  这首歌需要贝斯。  This song needs bass.
50  我们明天再混音。  Let’s mix tomorrow.
51  你今天复习了多久？  How long did you study today?
52  我每天记十个生词。  I memorize ten new words every day.
53  这个句子什么意思？  What does this sentence mean?
54  请给我一个例子。  Please give me an example.
55  我们一起做口语练习。  Let’s practice speaking together.
56  你的发音很标准。  Your pronunciation is very standard.
57  再读一遍，好吗？  Please read it again, okay?
58  这个语法要注意。  Pay attention to this grammar point.
59  请改一下我的作业。  Please correct my homework.
60  我们下周有考试。  We have an exam next week.
61  我想点一份牛肉面。  I’d like an order of beef noodles.
62  不要太辣，谢谢。  Not too spicy, thanks.
63  来一杯冰水可以吗？  Can I have a glass of ice water?
64  味道怎么样？  How does it taste?
65  服务员，结账！  Waiter, the bill please!
66  我吃饱了。  I’m full.
67  今天想自己做饭。  I want to cook by myself today.
68  冰箱里还有鸡蛋。  There are still eggs in the fridge.
69  锅太热，小心！  The pan is too hot, be careful!
70  我们买点蔬菜吧。  Let’s buy some vegetables.
71  我要去地铁站。  I need to go to the subway station.
72  请帮我叫出租车。  Please help me call a taxi.
73  这条路堵车了。  This road is jammed.
74  我们提前十分钟到。  We will arrive ten minutes early.
75  上海欢迎你！  Shanghai welcomes you!
76  我要换一张高铁票。  I want to change my high‑speed rail ticket.
77  请告诉我入口。  Please tell me the entrance.
78  下一站是南京路。  The next stop is Nanjing Road.
79  行李太重了。  The luggage is too heavy.
80  这个地方很安全。  This place is very safe.
81  今晚有空吗？  Are you free tonight?
82  我们去打篮球吧。  Let’s go play basketball.
83  我在家等快递。  I’m waiting for a delivery at home.
84  别忘了带钥匙。  Don’t forget to bring the key.
85  灯坏了，需要换。  The light is broken and needs to be replaced.
86  我喜欢安静的房间。  I like a quiet room.
87  周末一起看电影？  Want to watch a movie together this weekend?
88  这本书很有意思。  This book is very interesting.
89  我要早点睡觉。  I’m going to bed early.
90  别一直玩手机。  Don’t keep playing on your phone.
91  今天心情不错。  I’m in a good mood today.
92  请给我一点建议。  Please give me some advice.
93  我需要更多时间。  I need more time.
94  事情已经解决了。  The matter has been resolved.
95  你的想法很棒！  Your idea is great!
96  一起加油吧！  Let’s work hard together!
97  有问题随时联系。  Contact me anytime if there is a problem.
98  明天见！  See you tomorrow!
99  祝你一路顺风。  Wish you a safe journey.
100  谢谢你的帮助！  Thank you for your help!
]

7. UI / UX Specs

• Chinese glyphs: font-size clamp(2.5 rem, 6 vw, 5 rem); font-family "Source Han Sans", monospace; color #31ff4d.
• Hover glyph: transform scale(1.2); text‑shadow 0 0 8 px #4cff79; transition 120 ms.
• Non‑hover siblings: transform scale(0.8); opacity 0.6.
• English bar: fixed footer, 90 % width, translucent black, white monospace font.
• Matrix background: CSS animated vertical glyph rain (perf‑safe, pseudo‑elements + keyframes).

8. Key Flows

Load → dataService.init() → cache dictionary & sentences → uiService.renderBatch(5).
Hover → event delegation reads data‑char → looks up pinyin → tooltip + footer update.
Shuffle → uiService.renderBatch(5); repeats only after full pool shown.

9. Edge‑Case Handling

• Character absent from dictionary → display “—” pinyin; console log.
• Mobile → hover replaced by touchstart; second tap anywhere resets.
• Large JSON (>1 MB) → progressive fetch & parse.

10. Non‑Goals

• No backend, login, or user accounts.
• No runtime pinyin conversion; rely on pre‑built dictionary for speed and accuracy.