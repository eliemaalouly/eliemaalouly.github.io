---
title: "Mapping the Mythos: Part II"
tagline: "Who's Really at the Center of the Drama?"
date: 2025-06-18
toc_icon: fa-solid fa-scroll
classes: justified-post
sidebar:
  nav: "greek-myth-network" 
header:
  overlay_filter: "0.4"
  overlay_image: /assets/images/posts/greek-myth-network2/hero.png
  min_height: 36vw
  max_height: 73vw
  image_position: center center
  teaser: /assets/images/posts/greek-myth-network2/hero.png
---

In the first part of this series, we laid the groundwork by scraping datasets of Greek mythological texts and characters, extracting connections between them. Now, in Part II, we delve into the network analysis of these mythological figures to uncover who truly holds the center stage in this ancient drama. As mentioned in the first part, the code for this project is available on [GitHub](https://github.com/eliemaalouly/greek-myth-network){:target="_blank" rel="noopener noreferrer"}.

<br>

# Basic Network Statistics

Using the edges and nodes datasets that were created in the first part, we can get some basic network statistics with the help of the [NetworkX](https://networkx.org/){:target="_blank" rel="noopener noreferrer"} library.

{: .notice--danger}
**The dreaded terminology alert**: Several new terms will be introduced, which may be overwhelming and frankly a bit boring! I'll try to make it as painless as possible by explaining all these new terms in the simplest way possible. Feel free to skip ahead if you are already familiar with them.

I am going to introduce some key concepts in network analysis required to understand the basic statistics. This might get boring but just bear with me. From Part I, you are already familiar with the concepts of nodes and edges. Here are some additional terms that will be used in the analysis:
- **Average degree**: The average number of connections (edges) each node (character) has in the network. It gives an idea of how interconnected the network is. For example, if the average degree is 100, it means each character is connected to about 100 other characters on average, indicating a highly interconnected network. On the other hand, if the average degree is 1, it means most characters are only connected to one other character, indicating a sparse network.
- **Density**: The ratio of the number of edges in the network to the maximum possible number of edges. It ranges from 0 (no connections) to 1 (complete connectivity). A density of 0.1 means that only 10% of all possible connections between characters are actually present. For example, let's keep this simple and imagine we have a network of only 4 characters (A, B, C, D). The maximum **possible** number of edges in this network is 6 (A-B, A-C, A-D, B-C, B-D, C-D). So 6 edges are just how many are possible theoretically; However, If we see that we **actually** only have 2 edges (A-B and C-D), the density would be 2/6 = 0.33 or 33%. A lower percentage indicates a more sparse network, while a higher percentage indicates a more connected network.
- **Connected components**: Subsets of the network where every node is reachable from every other node within that subset. If a network has **multiple** connected components, it means there are isolated groups of characters that do not interact with each other. Let's take a simple example with 6 characters: A, B, C, D, E, F. If A is only connected to B and C, and D is only connected to E and F, we have two connected components: {A, B, C} and {D, E, F}, because any character in {A, B, C} can reach any other character in that group[^1], and the same goes for {D, E, F}. However, there are no connections between one component to the other, this means that characters in one component cannot interact with characters in the other component.
- **Diameter**: The longest shortest path (Could they have chosen a more confusing term?) between any two nodes in the network. Let's say we have a network of 5 characters: A, B, C, D, E. If A is connected to B, B to C, C to D, and D to E, the diameter would be 4 because the longest shortest path between any two characters is A to E (A → B → C → D → E). This means that the longest distance between any two characters in the network is 4 steps. If you still find this confusing, I like to think of it as traveling between cities. There are hundreds of cities in your state. You have multiple ways to get from one city to another. You can take a train that passes through 3 other cities, or you can take a bus that passes through 5 other cities. The **diameter** is the longest distance you can travel between any two cities in the network, which in this case is 5 cities. In other words, it's the worst-case scenario for how far apart two characters can be in the network. It gives us an idea of how "spread out" the network is. If the diameter is small, it means that most characters are relatively close to each other in terms of connections. If the diameter is large, it means that some characters are very far apart in the network.
- **Average shortest path length**: The average number of edges in the shortest path between all pairs of nodes. As a simple example, let's say we have a network of 4 characters: A, B, C, D. If A is connected to B and C, and B is connected to D, the shortest path between A and D is 2 (A → B → D). The shortest path between B and C is 1 (B → C). The shortest path between C and D is 2 (C → B → D). We repeat this for all pairs of characters. The average shortest path length would be the average of all shortest paths between all pairs of characters. If we calculate it for all pairs in this example, we find that the average shortest path length is 1.5. This metric helps us understand how quickly information can travel through the network. In our example, the average shortest path length is 1.5, which means that on average, you can reach any character from any other character in just 1.5 steps. This is a sign of a small-world network.

Phewww. That was a lot of new terms, but I hope it was clear enough. Now let's make use of these terms!

The mythological character network extracted from the corpus consists of **943 unique characters** (nodes) and **26,696 undirected[^2] relationships** (edges) derived from co-occurrences in myth texts. This structure provides a foundational view of how interconnected the figures of Greek mythology are.

The network has an **average degree of 57**, meaning each character is directly connected to roughly 57 others on average. The network exhibits a moderate level of connectivity, with a density of **0.06**. This indicates that only a small fraction (**6%**) of all possible character pairs are actually connected, a reflection of how mythological figures tend to appear in limited narrative contexts or clusters.

Remarkably, the network is almost entirely connected. The full graph is composed of **two connected components**, suggesting that Greek mythology, as represented in this dataset, contains two isolated narrative groups. Looking closer at these groups, we find that the largest component contains **941 characters**, accounting for almost all of the mythological interactions. This indicates that nearly all known mythological figures appear in a shared narrative universe, with overlapping appearances across stories and texts. The smaller group contains only two characters, namely **Phantasos** and **Phobetor**. These characters only made one appearance in Ovid’s Metamorphoses Book 11 where they co-occurred in one line mentioning the sons of Morpheus:

> That son, by the gods above was called Icelos—but the inhabitants of earth called him Phobetor—and a third son, named Phantasos, cleverly could change himself into the forms of earth that have no life; into a statue, water, or a tree.

<cite>Ovid</cite> --- Metamorphoses, Book 11, Section 8: **"Ceyx & Halcyone"**
{: .small}

As these two characters were not mentioned[^3] anywhere else in our dataset, they formed their own "isolated island", completely disconnected from all the other 941 characters living in one main narrative group.

Focusing on the main cluster, the **diameter**, the longest shortest path between any two characters, is **5**, while the **average shortest path length** is **2.15**. These values demonstrate a clear small-world property, where even distant characters are rarely more than two degrees apart, reinforcing the idea that Greek myths are densely interlinked despite covering vast thematic and temporal ground.

**So what do all these network statistics tell us?** Well, I wouldn't say they show anything surprising so far (except for maybe the average path length), but they do provide a solid foundation for further analysis. The network is highly interconnected, with most characters appearing in multiple stories and contexts. The small-world property suggests that any two characters (whether minor or major) can quickly connect to each other in about 2 steps on average (which is insane if you think about it given the huge number of characters!), reflecting the fluidity and adaptability of Greek mythology as a narrative tradition.

<br>

# Centrality Analysis

Now let's get to the juicy part of the analysis: **centrality measures**. To evaluate which characters play structurally important roles in Greek mythology, we applied several centrality metrics (<span title="Who interacts with the most people?">degree</span>, <span title="Who connects different groups?">betweenness</span>, <span title="Who has powerful friends?">eigenvector</span>, and <span title="Who gets attention from important people?">Pagerank</span>) from network theory. Each measure highlights a different dimension of influence, from sheer popularity to narrative bridge-building or deeper systemic significance. With [NetworkX](https://networkx.org/){:target="_blank" rel="noopener noreferrer"}, we can easily compute these centrality measures for our mythological network. Let's take a look at the top 10 characters for each centrality measure:

{% include figure popup=true image_path="/assets/images/posts/greek-myth-network2/ranked_centrality_charts.png"%}

We can see that the top 10 spots for each centrality measure are dominated by almost the same characters (Olympian gods), with some minor variations. This indicates that these characters are not only popular (high <span title="Who interacts with the most people?">degree centrality</span>), but also play important roles in connecting different groups (high <span title="Who connects different groups?">betweenness centrality</span>), have powerful friends (high <span title="Who has powerful friends?">eigenvector centrality</span>), and get attention from important people (high <span title="Who gets attention from important people?">Pagerank centrality</span>). Zeus, the king of the gods, unsurprisingly takes the top position in all four measures, followed closely by Apollo and Heracles who are fighting for the second place.

Heracles is the only non-Olympian to make it to the top 10 in all of the measures, which is quite interesting. He is a demigod, the son of Zeus and Alcmene, and is known for his incredible strength and heroic deeds. His presence in the top ranks (let alone consistently between the 2<sup>nd</sup> and 3<sup>rd</sup> place) indicates that he plays a significant role in the mythological network, connecting various characters and stories. The only mortal character to make it to the top 10 is Odysseus, who is known for his cunning and intelligence. He is the protagonist of Homer's "Odyssey" and is often portrayed as a hero who overcomes great challenges through his wit and resourcefulness. Odysseus only infiltrates the top 10 in <span title="Who connects different groups?">betweenness centrality</span> obtaining 7<sup>th</sup> place, which indicates that he plays a significant role in connecting different groups of characters, but is not as popular or influential as the Olympian gods. His role in the network is more about bridging gaps between different stories and characters, rather than being a central figure in the mythology itself.

<br>

# Community Insights

Let's see what  else we can learn from the network. We can use community detection algorithms to identify clusters of characters that frequently interact with each other. This can help us understand how characters are grouped based on their connections and how these groups relate to each other. If we think of the network as one big party, some people might form their own tight-knit circles where they chat and interact more frequently, while others might be more isolated or only interact with a few people. Community detection algorithms can help us identify these circles and see how they relate to each other.

I applied a community detection algorithm with [NetworkX](https://networkx.org/){:target="_blank" rel="noopener noreferrer"} to identify clusters of characters that frequently interact with each other. Using the [greedy modularity maximization](https://networkx.org/documentation/stable/reference/algorithms/generated/networkx.algorithms.community.modularity_max.greedy_modularity_communities.html){:target="_blank" rel="noopener noreferrer"} method, I uncovered 7 distinct communities  with highly imbalanced sizes within the network, revealing how characters are grouped based on their connections.

{% include figure popup=true image_path="/assets/images/posts/greek-myth-network2/communities_sizes.png"%}

We can see 2 large communities, 1 medium-sized community, and 4 small-sized communities. The three largest communities account for the vast majority of the characters:

1. Community 1: 417
2. Community 2: 355
3. Community 3: 148

The remaining communities contain just a few characters each, often due to isolated stories or minor connections.

Let's take a look at the most central characters in each of the top 3 communities

| Community 1 | Community 2                                                                              | Community 3 |
| ----------- | ---------------------------------------------------------------------------------------- | ----------- |
| Zeus        | Achilles                                                                                 | Athena      |
| Apollo      | Agamemnon                                                                                | Eleusis     |
| Heracles    | Odysseus                                                                                 | Amphictyon  |
| Poseidon    | Theseus                                                                                  | Stymphalus  |
| Demeter     | Ares                                                                                     | Phorbas     |
| Artemis     | Paris                                                                                    | Niobe       |
| Aphrodite   | Sparta                                                                                   | Tantalus    |
| Hera        | Priam                                                                                    | Deucalion   |
| Hermes      | <span class="easter-egg-container">Helen of Troy<span class="easter-egg">🥚</span></span> | Asopus      |
| Cronus      | Asclepius                                                                                | Xuthus      |
{: .text-center}

Looking strictly at the most central characters we can see a dominance of Olympian gods in Community 1, while Community 2 is dominated by characters of the Trojan War. I tried to find a pattern in how these communities are structured, but nothing seems apparent, except that characters from Epics seem to populate Community 2, while characters from plays seem to populate Community 1. While community detection identified seven distinct structural clusters, their boundaries do not always align neatly with literary sources or periods. This reflects the deeply interwoven nature of Greek mythology, where key figures reappear across genres and eras. Instead, some communities seem to reflect thematic or functional groupings rather than strict textual divisions. But overall, the interwoven nature of Greek mythology is evident, where the structure of the communities reflects a complex web of relationships that transcends individual texts and periods. Characters frequently appear across multiple communities, indicating their multifaceted roles in the mythological narrative.

<br>

# Shifts in Character Roles

## Transcultural Dynamics

Greek mythology evolved over centuries, shaped by shifting literary traditions, political landscapes, philosophical influences, and cultural exchanges. Although Roman adaptations of Greek myths often retained core characters and narratives, they introduced new interpretations and emphases. They were not truly a <a href="/assets/images/posts/greek-myth-network2/greek-roman.png" class="image-popup">copy of Greek mythology</a>, but rather a reinterpretation that reflected Roman values and beliefs. To explore how the roles of characters changed across those two cultures, I used the language of the original texts as a proxy for culture (Greek language for Greek texts, Latin for Roman texts). I then calculated the centrality measures separately depending on whether the edge was extracted from a Greek or Latin text. This allows us to compare the centrality ranks of characters in Greek and Latin mythological texts, revealing how their roles evolved across cultures.

Let's take a look at the top 5 characters in each centrality measure for both Greek and Latin texts.

{% include figure popup=true image_path="/assets/images/posts/greek-myth-network2/centrality_language.png"%}

We can see that there is a significant difference in the centrality ranks of characters between the Greek and Latin texts. The most striking difference is the fall of Zeus from the 1<sup>st</sup> place in all centrality measures in the Greek texts to the 2<sup>nd</sup> place in <span title="Who connects different groups?">betweenness</span> and <span title="Who gets attention from important people?">Pagerank centrality</span> in the Latin texts while falling off the top 5 completely in the remaining measures! Zeus was dethroned in the Latin texts by Apollo who took the top spot in all centrality measures!

Another notable change is the decrease in the influence of Olympians in the Latin texts. The top 5 ranks in Greek texts are completely dominated by Olympian gods, with the exception of Heracles. However, in the Latin texts, Apollo is the only Olympian to make it to the top 5 in <span title="Who interacts with the most people?">degree centrality</span>. Apollo and Zeus are the only Olympians in the top 5 in <span title="Who has powerful friends?">eigenvector centrality</span>, while Apollo and Poseidon are the only Olympians in the top 5 in <span title="Who gets attention from important people?">Pagerank centrality</span>. Only in the case of <span title="Who connects different groups?">betweenness centrality</span> do we see a complete dominance of Olympians, with Apollo, Zeus, Poseidon, and Athena taking 4 of the top 5 spots. This indicates that the roles of characters in Greek mythology changed significantly when adapted into Latin texts. Olympian gods are now less central to the narrative (with the exception of Apollo). Their diminished dominance in <span title="Who has powerful friends?">eigenvector</span> and <span title="Who gets attention from important people?">Pagerank centrality</span> suggests a shift in narrative focus, with other characters gaining prominence in the Latin adaptations. This could reflect changing cultural values or narrative priorities in Roman society, where the emphasis may have shifted from divine authority to human agency. However, the role of the Olympians is still significant, as they still occupy the top ranks in <span title="Who connects different groups?">betweenness centrality</span> and <span title="Who interacts with the most people?">degree centrality</span>. This indicates that they still play important roles in connecting different groups of characters, but their influence is not as dominant as it was in the Greek texts.

Next, let's take a look at characters that have a significant difference in their centrality ranks between the Greek and Latin texts. This will help us identify characters whose roles changed significantly across cultures, either gaining or losing influence in the mythological narrative. First, the Olympians with the most extreme change (more than 200 rank change) in their <span title="Who interacts with the most people?">degree centrality</span> ranks between the Greek and Latin texts are:

| Olympian | Greek Rank | Roman Rank | Rank Change |
| -------- | ---------- | ---------- |
| Hestia   | 497        | 226        | +271        |
| Hebe     | 264        | 528        | -264        |
| Hermes   | 7          | 226        | -219        |
{: .text-center}

Next, Greek deities (non-Olympians) with the most extreme change (more than 500 rank change) in their <span title="Who interacts with the most people?">degree centrality</span> ranks between the Greek and Latin texts are:

| Deity     | Greek Rank | Roman Rank | Rank Change |
| --------- | ---------- | ---------- |
| Scylla    | 685        | 41         | +644        |
| Hymen     | 880        | 282        | +598        |
| Dionysus  | 10         | 597        | -587        |
| Helle     | 651        | 69         | +582        |
| Pheme     | 637        | 59         | +578        |
| Atropos   | 762        | 212        | +550        |
| Asclepius | 52         | 597        | -545        |
| Chaos     | 637        | 94         | +543        |
| Iacchus   | 827        | 315        | +512        |
| Helios    | 85         | 597        | -512        |
{: .text-center}

Now let's take a look at the top 10 characters with the most extreme change in their <span title="Who interacts with the most people?">degree centrality</span> ranks between the Greek and Latin texts. 

{% include figure popup=true image_path="/assets/images/posts/greek-myth-network2/centrality_rank_change_language.png"%}

We do see some extreme changes in the ranks of some characters, Hestia, for example, has a rank change of +271 places, moving from 497th place in the Greek texts to 226th place in the Latin texts. This is an interesting change, especially considering that Hestia (Vesta in Roman mythology) became a more prominent figure in Roman mythology, where she was associated with the hearth and home. Her increased rank in the Latin texts reflects her elevated status in Roman culture, where she was regarded as a goddess of domesticity and family life and associated with the much-revered order of the Vestal Virgins who were in charge of maintaining the sacred fire and performed rituals ensuring Rome's protection.

We also see a significant drop in the <span title="Who interacts with the most people?">degree centrality</span> rank of Hermes from 7th place in the Greek texts to 226th place in the Latin texts. This indicates that Hermes, the messenger god, lost a considerable amount of influence in the Latin texts compared to the Greek ones. This change does make sense when we consider that the Roman equivalent of Hermes, Mercury, was given a different role[^4] in Roman mythology, where he was more associated with commerce and trade rather than being a messenger of the gods. In Latin texts, Mercury appears more as a functional deity, often in lists and rituals, but barely as a character in stories. As Roman culture absorbed Greek mythology, and mixed it with Etruscan influences and their own traditions, the role of Hermes in the Greek texts was split among various deities in Roman mythology, such as Janus[^5] who was regarded as the guardian of doorways and transitions. This shift in focus likely contributed to his reduced centrality in the Latin texts.

I don't know about you, but this was shocking to me! Dionysus has gone from being in the top 10 in Greek texts to being ranked 597<sup>th</sup> in Latin texts! I took a look at his other centrality measures for an extra check. There is a drop in his <span title="Who connects different groups?">betweenness centrality</span> rank from 6th place in Greek texts to 307th place in the Latin ones. The drop is more severe in <span title="Who gets attention from important people?">Pagerank centrality</span> from 7th place to 628! For <span title="Who has powerful friends?">eigenvector centrality</span>, a drop from 4th place to 639! That's a drop of 635 places! This is an unimaginable change, indicating that his role in the mythological network has diminished from a major god in the Greek texts to an almost minor insignificant character in the Latin texts. But why is that? How can the role of such a major Greek god be so drastically reduced in the Latin texts?

After a bit of digging, there is a plausible and very interesting explanation for this. In Roman mythology, Dionysus was referred to as Bacchus[^6], who was associated with wine, fertility, and ritual madness. In ancient Greek society, Dionysus had a special place. He was central to mystery cults such as the Dionysian Mysteries[^7], which were secret religious rites that celebrated the god's death and rebirth and promised salvation and ecstatic experiences. He was also intimately tied to the theater, as many Greek plays were performed in his honor during festivals like the City Dionysia[^8] in Athens. Dionysus symbolized the liberation of the self from societal constraints, especially through intoxication and ritual madness. On the other hand, Roman religion was more structured, public, and politically oriented. It emphasized social order and civic duty over ecstatic experience. Bacchic rituals, associated with secrecy, sexual liberation, and emotional excess, conflicted with Roman values of Gravitas and constantia[^9]. Then came The Bacchanalian Scandal[^10] in 186 BCE, where the perception of Bacchus as a dangerous figure reached its peak, with descriptions of the Bacchanalia as subversive and immoral, implicating them in criminal activity, sexual promiscuity, and political conspiracies. This culminated in the Roman Senate's decree, the "Senatus consultum de Bacchanalibus"[^11], which severely restricted the Bacchic cult and its practices. The decree effectively banned the Bacchanalia, limiting their gatherings to only a few times a year and under strict supervision. This marked a significant shift in how Bacchus was perceived in Roman society, transforming him from a major deity associated with ecstatic worship to a more subdued and controlled figure.

But this is possibly not really about preventing the moral deterioration of Roman society, but rather a political move to consolidate power and control over the common people. The Roman elite saw the Bacchanalia as a threat to their authority, as the cult's secretive nature and ecstatic rituals could potentially challenge the established order. In Rome, Bacchus was the champion of the Plebians, the common people, during commemorations like the Liberalia[^12]. He symbolized freedom and social equality, resonating strongly with the lower classes. The Bacchic cult crossed lines of class and gender, including in its ranks slaves, freedmen, women, and men, thus becoming a socially disruptive force[^13]. Dionysus was also linked to Spartacus, who was believed to be Thracian[^14], and became a symbol of his revolution. His wife (according to Plutarch) was a *"prophetess and subject to visitations of the Dionysian frenzy"*[^15]. Dionysus became the rallying cry for a number of Rome's opponents such as the rebel slaves in Sicily in the second century B.C.E., and the Anatolian King Mithradates of Pontus, whose protracted battle against Rome was still ongoing at the time of Spartacus's uprising in 73 B.C.E.[^16] I believe this to be a plausible explanation for the drastic change in the role given to Dionysus in the Latin texts. The Roman upper classes' fear of the Bacchic cult's potential to disrupt social order and challenge their authority led to a significant reduction in the prominence of Bacchus in their texts (and let's not forget that most if not all the texts we have today were written by the upper classes who had the education, resources, and time to write), resulting in his diminished centrality in the mythological network.

Ok, that was a long detour, but I hope you found it as fascinating as I did! Here's a <a href="/assets/images/posts/greek-myth-network2/duck-bacchus.png" class="image-popup">Dionysian duck</a> as a celebration for all of us!

## Gender Distribution

Let's finally look at how centrality is distributed across genders. First, I looked at how the characters are distributed across the genders.:

| Gender          | Count |
| --------------- | ----- |
| Male            | 614   |
| Female          | 312   |
| Male organism   | 4     |
| Female organism | 4     |
| Trans man       | 2     |
| Hermaphrodite   | 1     |
| Intersex        | 1     |
{: .text-center}

Due to the very low number of non-binary characters, I have only included Male and Female characters in this analysis. It is evident there is a much larger representation of male characters, where around **66.3%** of the characters are male and **33.7%** are female. But how about the centrality measures? Are there any differences in the centrality measures between male and female characters? I first checked the average centrality ranks for male and female characters. In all of the centrality measures, male characters had a higher score, which is not surprising but also not that interesting. Looking at the average alone can be misleading, as it does not take into account the distribution of the characters. So let's look at the distribution of the <span title="Who gets attention from important people?">Pagerank centrality</span> ranks.

{% include figure popup=true image_path="/assets/images/posts/greek-myth-network2/pagerank_by_gender.png"%}

From the figure, we can see that the lower ranks (more central characters) are more densely populated by male characters, while the higher ranks (less central characters) are more densely populated by female characters. It is clear that male characters are therefore given a more prominent role when we look at the Greek mythological universe as a whole (even though the figure only shows <span title="Who gets attention from important people?">Pagerank centrality</span>, The distribution of all the other centrality measures shows a similar pattern where male characters dominate the most central ranks). 

Is this pattern still present when we compare the Greek and Latin texts? Let's take a look at the <span title="Who interacts with the most people?">degree centrality</span> and <span title="Who gets attention from important people?">Pagerank centrality</span> ranks of the male and female characters in the Greek and Latin texts.

{% include figure popup=true image_path="/assets/images/posts/greek-myth-network2/degree_by_gender_language.png"%}

{% include figure popup=true image_path="/assets/images/posts/greek-myth-network2/pagerank_by_gender_language.png"%}

Here a more interesting pattern emerges. In the Greek texts, male characters dominate the lower ranks (more central characters) in both <span title="Who interacts with the most people?">degree</span> and <span title="Who gets attention from important people?">Pagerank centrality</span>. The male characters are therefore given a more prominent forward-facing role (<span title="Who interacts with the most people?">degree centrality</span>) and a more influential role (<span title="Who gets attention from important people?">Pagerank centrality</span>). However, in the Latin texts, the pattern is different. While male characters do still dominate the lower ranks (although slightly) in <span title="Who interacts with the most people?">degree centrality</span>, the distribution of <span title="Who gets attention from important people?">Pagerank centrality</span> ranks has shifted in favor of the female characters.

This shift could be attributed to the changing roles of women in Roman society compared to Greek society. In ancient Greece, women had no political rights (couldn't vote or hold office) and were largely confined to the domestic sphere[^17] (although some exceptions existed such as in Sparta, where girls received physical training and more freedom). They were supposed to stay out of the public eye and were not allowed to participate in politics. However, in ancient Rome, women had more legal autonomy (although only slightly more than in ancient Greece). Though still couldn't vote or hold office, they could own property, manage their own finances, and even run businesses[^18]. They could even influence politics behind the scenes through their relationships with powerful men. Women participated in public life to a greater extent than in Greece, and some had important priestly roles, such as the Vestal Virgins who were responsible for maintaining the sacred fire of Vesta.

Influential Roman women like Livia (wife of Augustus) and Agrippina the Younger wielded real political influence through family ties. Livia was regarded as a trusted confidant and advisor to her husband, Emperor Augustus, and played a key role in shaping imperial succession. She was also rumored to have been involved in the deaths of several political rivals to ensure her son Tiberius's ascension to the throne [^19]. Agrippina the younger, mother of Emperor Nero, was another powerful figure who exerted significant influence over her son's rule [^20]. She was known for her political acumen and ambition, and she played a key role in securing Nero's position as emperor. Ancient writers portray her as ambitious, fierce, obstinate, and strategically active in elevating her son Nero to the throne, maneuvering dynastic politics to her advantage.

There are many more examples, but what is important to note is that while Roman women couldn’t hold formal office, these elite figures effectively operated as backchannels: steering decisions, shaping alliances, and influencing imperial succession through their proximity to power. I think this might give us a clue as to why in the Latin texts women have a higher <span title="Who gets attention from important people?">Pagerank centrality</span> while having a lower <span title="Who interacts with the most people?">degree centrality</span> than men. And I believe it is a reflection of how the power of women was viewed in Roman society. The public perceived real power as being with men. They were the face of the republic and empire (public officials, generals, etc.) and were the ones who interacted publically in political life. This might translate to a high <span title="Who interacts with the most people?">degree centrality</span>, as characters who have the most interactions with other characters. Women, on the other hand, were often seen as having a more behind-the-scenes role, influencing decisions through their connections to influential men without being in the public eye. This might translate to a high <span title="Who gets attention from important people?">Pagerank centrality</span>, as characters who are connected to many important characters, but not necessarily a big number of connections overall.

{: .notice--info}
Now, this is just a hypothesis, and I would love to hear your thoughts on this! It is important to remember that all these are just interpretations based on the data **I have** and how the **relationships** were defined. The data I have is not exhaustive, there are still much more texts that I do not have my hands on. There are also lots of texts that never survived to our present day. The data used here is only a small fraction and probably not enough to get anything close to a definitive answer to the questions we might have. The relationships were defined as co-occurrences which is obviously not going to be accurate as the characters can be mentioned together in the same sentence while not having any kind of real relationship and characters mentioned far apart can have a relationship. These limitations should be kept in mind when interpreting the results. And even if we did have perfect, complete data, there are still so many factors that could have influenced the roles of characters in Greek and Latin texts. The data is a reflection of the stories that were told and the roles that characters played in those stories. It is not a definitive representation of the characters themselves or their roles in society. With all that being said, it is till fun to explore the data and speculate on the possible links between the data and the real world, as long as we keep in mind the limitations of the data and the relationships defined, and that we do not take the results as definitive answers to the questions we might have.

<br>

# Conclusion

All right, we made it! I hope you enjoyed this deep dive into the Greek mythological network! We explored how characters are connected, who the most central characters are, and how their roles changed across cultures. There's a lot more data to explore in these datasets, and I encourage you to take a look at the repository and play around with the data yourself. You can find the datasets, notebooks, and all the code on [GitHub](https://github.com/eliemaalouly/greek-myth-network){:target="_blank" rel="noopener noreferrer"}.



[^1]: Every character in the component can reach every other character in that component through a series of edges, even if not directly connected. In this example, A has a direct connection to B and C, therefore C can reach B through A (C → A → B).
[^2]: The edges are undirected, meaning that relationships between characters do not have a direction (e.g., "A is related to B" is the same as "B is related to A"). This allows us to focus on the connections themselves rather than their directionality.
[^3]: Actually, they might have been mentioned in the dataset, but in that case, they would have been mentioned without the co-occurrence of any other character, keeping them isolated.
[^4]: ["Differences between Hermes and Mercury." Ancient Links (blog). January 25, 2011](https://ancientlinks.blogspot.com/2011/01/differences-between-hermes-and-mercury.html){:target="_blank" rel="noopener noreferrer"}
[^5]: ["Janus." World History Encyclopedia. February 6, 2015](https://www.worldhistory.org/Janus/){:target="_blank" rel="noopener noreferrer"}
[^6]: ["Bacchus." World History Encyclopedia. August 8, 2023](https://www.worldhistory.org/Bacchus/){:target="_blank" rel="noopener noreferrer"}
[^7]: ["Dionysian Mysteries." Wikipedia. June 12, 2025](https://en.wikipedia.org/wiki/Dionysian_Mysteries){:target="_blank" rel="noopener noreferrer"}
[^8]: ["City Dionysia." Wikipedia. June 11, 2025](https://en.wikipedia.org/wiki/Dionysia){:target="_blank" rel="noopener noreferrer"}
[^9]: ["Gravitas and constantia." Wikipedia. February 26, 2025](https://en.wikipedia.org/wiki/Mos_maiorum#Gravitas_and_constantia){:target="_blank" rel="noopener noreferrer"}
[^10]: ["Bacchanalia: Exploring the Ancient Roman Festivals of Excess." The Roman Empire](https://roman-empire.net/religion/bacchanalia){:target="_blank" rel="noopener noreferrer"}
[^11]: ["Senatus consultum de Bacchanalibus." Wikipedia. January 4, 2025](https://en.wikipedia.org/wiki/Senatus_consultum_de_Bacchanalibus){:target="_blank" rel="noopener noreferrer"}
[^12]: ["Liberalia." Wikipedia. May 20, 2024](https://en.wikipedia.org/wiki/Liberalia){:target="_blank" rel="noopener noreferrer"}
[^13]: ["Bacchus." Roman Pagan (blog)](https://romanpagan.wordpress.com/bacchus/){:target="_blank" rel="noopener noreferrer"}
[^14]: Dionysus was a patron god of Thrace.
[^15]: ["The Life of Crassus." Plutarch. The Parallel Lives. Loeb Classical Library Edition, 1916](https://penelope.uchicago.edu/Thayer/E/Roman/Texts/Plutarch/Lives/Crassus*.html){:target="_blank" rel="noopener noreferrer"}
[^16]: ["The Unbelievable (Mostly) Untold Tale of Spartacus’s Wife." Barry Strauss (blog), April 8, 2013](https://barrystrauss.com/the-unbelievable-mostly-untold-story-of-spartacuss-wife/){:target="_blank" rel="noopener noreferrer"}
[^17]: ["Women in Ancient Greece." World History Encyclopedia. July 27, 2016](https://www.worldhistory.org/article/927/women-in-ancient-greece/){:target="_blank" rel="noopener noreferrer"}
[^18]: ["The Role of Women in the Roman World." World History Encyclopedia. February 22, 2014](https://www.worldhistory.org/article/659/the-role-of-women-in-the-roman-world/){:target="_blank" rel="noopener noreferrer"}
[^19]: ["The Most Powerful Woman in the History of Ancient Rome." Medium. April 24, 2024](https://medium.com/@ancient.rome/the-most-powerful-woman-in-the-history-of-ancient-rome-29c69a741cb7){:target="_blank" rel="noopener noreferrer"}
[^20]: ["Agrippina the Younger: the first true empress of Ancient Rome." Medium. March, 2019](https://www.historyextra.com/period/roman/agrippina-younger-empress-ancient-rome-empress-nero-caligula/){:target="_blank" rel="noopener noreferrer"}