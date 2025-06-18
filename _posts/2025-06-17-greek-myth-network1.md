---
title: "Mapping the Mythos: Part I"
tagline: "Assembling the Cast of Gods, Heroes and Monsters"
date: 2025-06-17
toc_icon: fa-solid fa-scroll
classes: justified-post
sidebar:
  nav: "greek-myth-network" 
header:
  overlay_filter: "0.5"
  overlay_image: /assets/images/posts/greek-myth-network1/hero.png
  min_height: 36vw
  max_height: 72vw
  image_position: top center
  teaser: /assets/images/posts/greek-myth-network1/hero.png
---

In this two-part series, we will explore the fascinating world of Greek mythology through the lens of network analysis. By examining the relationships between characters, we can uncover hidden patterns and insights about the mythological universe and the people who wrote them. In Part I, we will focus on the data gathering and information extraction process, while Part II will delve into the analysis of the central figures and their roles within the narrative structure. The code for this project is available on [GitHub](https://github.com/eliemaalouly/greek-myth-network){:target="_blank" rel="noopener noreferrer"}.

<br>

# Introduction

Ancient Greek mythology is more than just a collection of stories. It’s a vast, interconnected web of gods, heroes, monsters, and tragedies. But what if we treated this mythology not just as literature, but as a system, a network we could map, analyze, and explore?

I started with a set of big, open-ended questions, the kind you’d ask if you were trying to understand mythology not just as literature, but as a complex network of relationships:
1. Who are the most central and influential characters in Greek mythology?
2. What communities or clusters emerge and what do they correspond to?
3. How does a character’s centrality relate to their gender?
4. How does this centrality shift when we transition from Greek to Roman mythology?

These aren’t just trivia questions, they touch on the structural logic of myth. Greek mythology isn’t random (for the most part); it’s a universe with its own internal order. But most of that order is hidden in prose, spread across dozens of authors and centuries of storytelling. As a project, I wanted to extract this hidden structure. By representing the mythological universe as a graph with characters as nodes and relationships as edges, we can use tools from network analysis to surface new insights and hopefully answer these questions.

<br>

# Methodology

To explore these questions, I built a dataset of characters and relationships directly from ancient mythological texts. I began by scraping English translations of primary sources from [Theoi.com](https://www.theoi.com){:target="_blank" rel="noopener noreferrer"}, parsing and structuring the text into smaller narrative units. I then compiled a comprehensive list of mythological characters using [Wikidata](https://www.wikidata.org/){:target="_blank" rel="noopener noreferrer"}, filtering for relevance and type. From there, I used natural language processing to identify character mentions and infer relationships based on co-occurrences. These relationships were stored as edges in a graph, enabling network analysis to uncover patterns of centrality, clustering, and thematic structure across the mythological corpus.

Now in order to answer our questions we need to define our methodology properly. Here it would be useful to take a break from the technical details to talk about centrality in general, and how we will use it in this project. What does it mean to be central in a network? What are the different ways we can measure it? And how do these measures relate to the mythology we’re studying? How will we calculate these measures?

{: .notice--danger}
**The dreaded terminology alert**: Several new terms will be introduced, which may be overwhelming and frankly a bit boring! I'll try to make it as painless as possible by explaining all these new terms in the simplest way possible. Feel free to skip ahead if you are already familiar with them.

## Centrality in Networks

The two most basic terms that will be used throughout this project are **nodes** and **edges** and they are the simplest to understand. Simply put, nodes are the characters in our mythological network, and edges are the relationships between them. In network analysis, we represent these characters and their relationships as a graph, where nodes are points and edges are lines connecting them. This graph structure allows us to analyze the relationships between characters in a systematic way. There isn't much more to say on these two terms, so let's move on to the more interesting part: centrality.

Centrality is a key concept in network analysis, measuring the importance or influence of a node (character) within a network. In the context of Greek mythology, centrality can help us identify which characters are most pivotal to the narrative structure. There are several different ways to measure centrality based on how we decide to define it. So here is a brief simplified overview of the main centrality measures we will use in this project and how they relate to our mythological network:
1. **Degree Centrality**: The simplest measure, counting the number of direct connections a node has. It tells us who has the most relationships ("You're important because a lot of people are directly connected to you").<br>
> In Greek mythology, **Who interacts with the most people?**<br>
Some characters are everywhere. You see them in many myths interacting with lots of other figures. For example, we can imagine that Zeus has a high degree centrality because he's directly connected (<a href="/assets/images/posts/greek-myth-network1/zeus.jpg" class="image-popup">unfortunately not in a nice way!</a>) to countless others regardless of whether they are major or minor characters. It's the number of relationships that counts here (and Zeus is no slouch in that department!).

2. **Betweenness Centrality**: This measures how often a node lies on the shortest path between other nodes. It tells us who connects separate groups and helps information travel through the network ("You’re important because others rely on you to stay connected").<br>
> In Greek mythology, **Who connects different groups?**<br>
Some characters move between different parts of the mythological universe, such as the world of gods, mortals, and the underworld, or between Greek tragedies and Epics. They’re not just famous, they’re the link between different parts of the mythology. For example, Hermes might have high betweenness centrality because he connects gods to mortals, acting as a messenger and guide to the underworld. Hermes is therefore central, because without him, a lot of characters and places wouldn’t be connected.
3. **Eigenvector Centrality**: This measure considers the quality and influence of a node's connections. It tells us who is linked to other important people, not just how many people they know ("You’re important because your friends are important").<br>
> In Greek mythology, **Who has powerful friends?**<br>
Not all connections are equal. Some characters are influential because they’re close to other influential characters. For example, Athena may not have the most connections, but her relationships are high-quality. She advises Odysseus, Perseus, and Heracles, and she’s a trusted daughter of Zeus. Athena is therefore central because her connections are big players in the myths.
4. **PageRank**: It measures the influence of a node based on the number and quality of links it receives, similar to eigenvector centrality but with a probabilistic interpretation. It tells us how often you're mentioned or pointed to by respected others, even if not directly connected to many ("You’re important because important people choose to talk about or link to you").<br>
> In Greek mythology, **Who gets attention from important people?**<br>
Some characters aren’t in every story, but when they show up, it’s because someone important is talking about them or dealing with them. For example, Hades might not have the most connections, but he’s mentioned by many important characters like Zeus and Persephone. He’s central because he’s mentioned or visited by characters who matter a lot, even if he doesn’t leave the Underworld often.

{: .notice--info}
**Note**: If you are new to these concepts it might get confusing and you might start mixing them up. Therefore, as we will come across these concepts throughout the project, if you don't remember what each one means, just hover over the terms in the text and a tooltip will appear with a brief reminder. For example, if you hover over <span title="Who interacts with the most people?">**Degree centrality**</span>, you will see a tooltip explaining that it represents who interacts with the most people.

## Defining Relationships

To analyze the relationships between characters, we need to define what constitutes a relationship for the purposes of this project. Relationships can be complex and multifaceted, but for our purposes, we will focus only on the co-occurrences of characters within the same narrative context. This means that if two characters appear within a specified number of sentences in the same myth or story, they will be considered connected. It is the most common way to define relationships in network analysis, especially when dealing with large text corpora where explicit relationships may not be clearly stated.

Now there is a bias in this approach, as we are going to use different genres of texts each with its own narrative style and structure. For example, tragedies and epic poetry like the "Iliad" or "Odyssey" may have a large number of connections for the lead characters compared to a small Homeric Hymn. This will cause the characters in long texts to dominate the connections in the network and would give these characters an unfair advantage. One way to mitigate this bias is by applying a weight to the extracted relationships in the texts.

Generally, in network analysis, weighting relationships allows us to differentiate between strong and weak connections. For example, a connection between family members may be considered stronger than a connection between acquaintances. However, this is not generally necessary and it depends completely on the type of analysis you want to perform. In our case, it will be a useful tool to balance the relationships extracted from different texts, especially when dealing with texts of varying lengths and narrative styles. I will consider each "myth" as a full narrative unit regardless of its length and the relationships between the characters will be normalized by the number of total relationships in that myth. This way, we can ensure that characters from shorter texts are not unfairly overshadowed by those from longer texts. For example, in the Illiad, a connection between Achilles and Hector will be weighted by the number of total connections between all characters in the text (which might be in the thousands), so that it does not dominate the network simply because the text is longer. Additionally, I applied a log transformation to keep the network balanced and to avoid the influence of outliers while preserving the order of the centrality ranks. The log "compresses" those outliers, so no single pair overwhelms the rest of the network. This makes it easier to see meaningful relationships across all texts, not just the loudest ones.

For those who want their math fix, the formula for the final weighted relationship between two characters A and B:
<a name="eq-weights"></a>

$$
\text{W}_{ij} = \log\left(1 + \sum_t \frac{c_{ij}^{(t)}}{C^{(t)}} \right)
$$

where:
- \\(W_{ij}\\) is the final weight of the relationship between characters \\(i\\) and \\(j\\) in all texts,
- \\(c_{ij}^{(t)}\\) is the number of co-occurrences between characters \\(i\\) and \\(j\\) in text \\(t\\),
- \\(C^{(t)}\\) is the total number of co-occurrences of all character pairs in myth \\(t\\).


<br>

# Data Collection

While the myths are culturally ubiquitous, the data isn’t. Most of these stories live in unstructured, messy texts, scattered across classical literature websites. Luckily we can find a good collection of English translations of primary sources on the [Theoi.com library](https://www.theoi.com/Library.html){:target="_blank" rel="noopener noreferrer"}. This site is a treasure trove of mythological texts, including epic poetry, tragedies, and other narratives. However, the data is not structured in a way that makes it easy to extract. Therefore, it was necessary to scrape the text from the site and parse it into smaller narrative units (which was not that pleasant).

## Text Corpus

I used [Beautiful Soup](https://www.crummy.com/software/BeautifulSoup/bs4/doc/){:target="_blank" rel="noopener noreferrer"} to first scrape a list of available texts in the Theoi library along with their metadata (URLs, author names, time period, original language). Then I built a crawler to scrape the text of each item from the list while excluding nonprimary sources (I'm looking at you [Tzetzes](https://en.wikipedia.org/wiki/John_Tzetzes){:target="_blank" rel="noopener noreferrer"}!). Due to the structure of the Theoi library, the texts were not organized in a straightforward manner, so I had to have the crawler navigate through multiple levels of links to reach the full parts of every text and store each text in a txt file. The crawler was designed to handle pagination and nested links, ensuring that all relevant texts were collected. Additionally, when a table of contents was present, the crawler would follow the links to each section and store the title of each section in a JSON file, allowing for a more organized dataset.

The text files were then imported and split based on the possible unique structures of the texts (some have sections with Roman numerals, some with Arabic numerals, some with titles and some without, some have a title only in the table of contents, etc.). I built a clean and structured dataset of mythological texts, where each entry corresponds to the smallest possible division of a text (e.g., one myth, or one book section). I also classified each text based on whether it's an Epic, dialogue (tragedy or comedy), or other. The dataset is comprised of 1441 entries. Here is an example of how the dataset looks like:

| index | author      | title       | url                                          | language | period      | years               | text                                                        | chapter | genre | section | myth                     |
| ----- | ----------- | ----------- | -------------------------------------------- | -------- | ----------- | ------------------- | ----------------------------------------------------------- | ------- | ----- | ------- |
| 54    | Homer       | Illiad      | https://www.theoi.com/Text/HomerIliad1.html  | Greek    | Archaic     | 800 B.C. - 500 B.C. | And the son of Atreus, Menelaus, dear to Ares,...           | 17      | Epic  | None    | None                     |
| 195   | Apollodorus | The Library | https://www.theoi.com/Text/Apollodorus1.html | Greek    | Hellenistic | 300 B.C. - 100 B.C. | Reigning over Calydon, Oeneus was the first who received... | 1       | Other | 8       | Oeneus, Meleager, Tydeus |

## Character dataset

To identify co-occurrences in the texts, we need to be able to correctly recognize the characters. The problem with using Named Entity Recognition (NER) is that it is not always accurate, especially with mythological characters. Many characters have multiple names or epithets, and some characters are not recognized by NER models at all as these tools are not really trained on such texts. Therefore, I decided to use a curated list of mythological characters from [Wikidata](https://www.wikidata.org/){:target="_blank" rel="noopener noreferrer"} as a reference.

I queried the database to extract all the instances of the [mythological Greek character](https://www.wikidata.org/wiki/Q22988604){:target="_blank" rel="noopener noreferrer"} class and to recursively extract all the instances of its subclasses along with some of their metadata that might be useful (name, aliases, Roman name, Roman aliases, domain, gender, siteLinkCount, etc.). This resulted in a huge dataset of over 6000 Greek mythological characters. Each of these characters also has a list of aliases. The problem with this is there will be multiple characters with the same name or alias which will cause problems when trying to identify co-occurrences in the texts. So I had to deduplicate the dataset by only keeping one character per name or alias. I did this by keeping the character that is more "important" by giving each character an importance score. This score is calculated based on the presence of a [Theoi.com](https://www.theoi.com){:target="_blank" rel="noopener noreferrer"} page for the character (characters with a page are more important), and the siteLinkCount[^1] (characters with a higher siteLinkCount are more important). After removing all the duplicate names, I was left with a final dataset containing 1076 unique characters, each with their metadata and aliases. Here is an example of how the dataset looks like:

| id      | name   | description                            | type                         | domain | gender | aliases                                                                  | residence | theoi_url                                   | level1                       | level2      | level3       | level4 | level5 |
| ------- | ------ | -------------------------------------- | ---------------------------- | ------ | ------ | ------------------------------------------------------------------------ | --------- | ------------------------------------------- | ---------------------------- | ----------- |
| Q174278 | Medea  | daughter of King Aeëtes of Colchis     | Mythological Greek Character |        | female |                                                                          |           |                                             | Mythological Greek Character |             |              |        |        |
| Q37340  | Apollo | god in Greek and later Roman mythology | Olympian god                 |        | male   | Apollōn, Aploun,  Apellōn,  Apeilōn,  Phoebus, Apollon, Mogounos, Mogons | Olympus   | https://www.theoi.com/Olympios/Apollon.html | Mythological Greek Character | Greek deity | Olympian god |        |        |
| Q420269 | Arges  | cyclops in Greek mythology             | cyclops                      |        | male   | Pyraemon, Acmonides                                                      |           |                                             | Mythological Greek Character | cyclops     |              |        |        |

<br>

# Nodes and edges extraction

Now that we have the text corpus and the character dataset, we can extract the relationships between characters. I used [spaCy](https://spacy.io/){:target="_blank" rel="noopener noreferrer"}, a powerful NLP library, to process the text and identify character mentions. I created a custom pipeline that uses the character dataset to recognize mentions of characters in the text and would resolve any alias to the canonical name of the character. This way, we can ensure that all mentions of a character are correctly identified, regardless of the name or alias used in the text. I set a 2 sentence window to identify co-occurrences, meaning that if two characters appear within 2 sentences of each other[^2], they will be considered connected.

Additionally, for dialogue-type texts, I used additional criteria to identify relationships. If a character is mentioned within the speech of another character, they will be considered connected. This is particularly useful for tragedies and comedies where characters often speak about or address each other directly. I also considered each consecutive speaker to be connected to the previous speaker, as they are part of the same dialogue exchange. This allows us to capture the dynamics of conversations and interactions between characters in a more nuanced way.

After going through the entire text corpus with [spaCy](https://spacy.io/){:target="_blank" rel="noopener noreferrer"}, I was able to extract a list of character pairs with their co-occurrences. For a network analysis, we need an edges and nodes datasets. For the edges dataset, I normalized the relationships as described in the [weighting formula](#eq-weights) based on the total number of co-occurrences in each myth (or the smallest available division of text). This resulted in a final dataset of character relationships, where each entry represents a unique connection between two characters along with its weight. The resulting dataset contains 48,414 unique relationships between characters. For the nodes dataset, I simply used the characters in the character dataset that appear in the edges dataset, along with their metadata. The final nodes dataset contains 943 unique characters.

---

<br>
This concludes the data-gathering and information-extraction process. In the next part, we will analyze the network structure and try to find answers to our initial questions. We will explore the centrality measures we defined earlier and see what patterns and relationships they reveal within the mythological universe.


[^1]: The number of links to the character from other Wikidata pages. A higher number of links indicates that the character is more important or more frequently referenced in other contexts.
[^2]: The choice of a 2 sentence window is somewhat arbitrary. A 3-5 sentence window is usually more common but it is mainly used when analyzing a network with a much smaller number of texts. In this project, I considered a 2 sentence window as it would be a bit more conservative than the more common 3-5 sentence window, but more flexible than a single-sentence window.

