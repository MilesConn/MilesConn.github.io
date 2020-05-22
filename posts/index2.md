---
# this is an empty front matter
---
# An Introduction

Wow a blog‽ Who would have thought. Yes I know I agree amazing I have a blog.
Just to get some quick house keeping out of the way this blog right now is using 
[Github Pages](https://pages.github.com/) for hosting, [Jekyll](https://jekyllrb.com/),
for its static site generation, and [Markdeep](https://casual-effects.com/markdeep/)
to do any of the actual rendering because I'm too lazy for now to learn Jekyll. 
(also some custom CS to get rid of watermarks...)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ CSS example
.markdeepFooter {
    display: none; #gets rid of the watermark
}
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
[Figure [cssblock]: This is why they pay me the big $]
You might be wondering _sheesh_ that sounds really complicated for such a simple blog.
And to that I'd say you're right. Way until you learn about JS, AWS, and the horde 
of microservices that keep the web running at an ever slower pace. Honnorable mention 
to [KISS](https://en.wikipedia.org/wiki/KISS_principle)

![Figure [Kiss Band]: The KISS design principle](./Kiss.jpg)

UPDATE UPDATE: I'm now using gatsby and developing locally

# Why Write Now?

Absolutely why write now. For one I think only one person knows the url to this blog. 
However the impetus for writing this blog is many fold

1. I can't sleep
2. I'm bored 

More so it's inspired by some recent happenings in social media 
![Image : You hate to see it](./tweet.jpg)

and I also want to incude a fascinating tirade by my friend Ryo Nishikubo colloquially 
known as __Chimbis__ 

> Bro participation is the new model for deterrence mdoern capital functions
> through the participation of the masses, its smooth continuation only possible
> through the propogation of new truths, of new meanings and actions, of "praxis"
> in order to preserve our faith in its existence in attempting to discover and
> construct an exact truth, a perfected hologram of reality which no longer
> represents, but totalizes the real, humanity has killed the possibility for
> truth all together. Each degree of perfected science, of pataphysicality in our
> understanding of the world, doesnt bring us closer to the asymptote of "truth"
> or "reality," it only makes our symbolic realm a more exact clone than the last,
> and in making it more exact, it becomes to exact in perfecting our many little
> truths, we have not found reality, but we have made a hyperreality, a perfected
> universe of transparency which jumps past the necessary distance required to
> allow reality, and finds itself in a world beyond meaning, in world beyond
> reality, a simulated world in which informations and holograms reign an example
> of this is the way companies use Search Engine optimisation to target users. The
> mast quantity of data on the individual isn't simply "representative" but it is
> totalized, it doesnt just describe the individual, but it overcodes and extends
> past them.  the accelerated renewal of information on the subject, this
> perfected, transparent image of who a person is can no longer be categorized in
> terms of meaning, because that assumes a certain distance between the signifier
> and signified a certain distinction between the symbolic and the real, which is
> necessary for the existence of the two, and thus the existence of meaning itself
> in erasing that distance through the perfected pataphysics of datafication, we
> haven't achieved the asymptotic truth you describe, but instead stepped past
> truth entirely, into a new universe one which has nothing to do with reality
> becuase in being born, it required reality's death guy debord is also wrong bc
> he still believes in the spectacle, the gaze, as the character of modern
> capitalism it assumes that the subject, still existing, percieves the
> "spectacle" of information and is seduced by it. But seduction is dead, it is no
> longer this mystical "trick" or "illusion" that capital finds itself on, but a
> operational and mechanical deconstruction and reconstruction of the subject
> itself The subject isn't tricked into believing, they are REMADE to have already
> believed, they are programmed to believe from the start, preempted in every way
> possible.  just like how google's data is so all encompassign that it can
> predict and even influence behaviours idenities are already constructed in temrs
> of the programmed model for identity the "vegan" is socialized in terms of the
> model "vegan," the activist is socialized in terms of the model "Activist" the
> programmed identity does not unfold by itself but is plotted out
> 
> I see this text as being unattainable - ME 
>
> to make it attainable is to attempt to create meaning but thats the double
> bind we're in, we are taught to participate, to create meaning at every turn
> like the 5 year plan but with fighting our selves because in the act of
> creating meaning, of seeking truth more fervently, we are only making more
> definite its death 
>
>
> We are preserving temporarily our word of coherence, but in doing so rendering
> its end entirely more inevitable Because everyone else still relies upon the
> myth of meaning - ME 
>
> you're right, the myth of meaning is what allows this process to implode on
> itself to saturate across all fields of understanding, just like you
> advocating for truth and for praxis and for engagement, it is a process that
> is not avoidable but that is also where we might find our revolution, the
> overcoming of capital As in this process of saturated information, in the
> process of overproducing data, we bring ourselves closer to collapse where in
> the past, revolution was found in explosive violence, our age now is that of
> implosive violence, where signs which have been stacked and clustered and
> reproduced obscenely finally implodes on itself I would argue that the riots
> in minneapolis are an example of that the implosion of signs, of the
> coroporate signage of power and control and consumerism, the sign of police
> and state fascism, the signs of participatory activism, of protest, of
> "standing with black lives" it all collapsed in on itself at the sight of the
> riot the riot isn't participitory, but implosive implosive destruction born of
> the utter overproduction of signs the participants themselves do not know the
> significance of their movement, because this implosive force has nothing to do
> with individual ideologies or politics, but it isn an inate condition of
> modern capitalism that as we impldoe as individuals, as discrete and
> meaningful subjects, into datafied models, the model itself implodes by means
> of the masses
> 
> And presenting to them this thesis of yours is seen as nonsense -ME 
>
> I dont need to present the thesis for it to work implosion doesnt need
> explanation to function, in fact to explain it, to seek to make it coherent,
> accessible, etc would be to build upon the same supporting structures of
> participatory acitvism, of meaning, which prevent this ultimate implosion.
> that's why baudrillard seeks to revel in his incoherence, why he includes
> eight different asides in each sentence, making it near impossible to read,
> while simultaneously injecting vocabulary which is entirely unnecessary and
> absurd the role of the philosopher is to riot
> 
> 
> 
> lol fuck participating to push us towards this implosive line
> 
> Nothing ? - me 
>
> whatever would arise would be incoherent to us it would arise in
> a world which has exceeded past meaning the violence capital exists on the
> contradiction of asserted political "truths" in a system which intrinsically
> undermines them

More on this later.
Finally if you're wondering how I formatted all of this so fast. **VIM**
it was as simple as 
~~~~~~~~~~~ vim
set textwidth=80, Visual-mode gq
begin,ends s/^/> /  
~~~~~~~~~~~
duh.

# Structural Induction in SML 

Recently I've been taking a class in programming called 
[15-150: Functional Programming](https://www.cs.cmu.edu/~15150/)

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~SML
val id = fn x => x : a' -> a'
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

\begin{align*}
    &f(x) \rightarrow \dots \tag{to be worked on} \\
\end{align*}

# Facebook, Badges, and the Hyperreal

## Intro
One of the things recently that's been on my mind is social networks and their
effects. I think social networks are vastly important and outside of strict CS
network theory I don't see as many studies as I'd like about them. I feel this
should eventually form a more coherent thought process but for now I'm just
going to spew it out and later come back and edit. For refernece my ideas are a
synthesis derived from [this
article](https://www.theatlantic.com/magazine/archive/2020/06/qanon-nothing-can-stop-what-is-coming/610567/)
and this [lecture](http://timroughgarden.org/f16/l/l6.pdf). And the question I
want to ask is 

## Whore diore herbs

>
> Why is Facebook such a breeding ground for bad stuff?
>

You might notice how vauge this is. And it's vauge on purpose. Initially I
wanted to talk about truthfulness and develop some sort of algorithm to
determine the truthfulness of things. The problems with such an idea are
manyfold.

1. Truthfulness algorithms would inhereit the same biases we as people employ
2. Truth is not attainable*

For now I'm treating these as axioms but I definitely should develop these
further in the future. My reasoning for the first one is a direct descedent of
problems in machine learning. Our final algorithm is going to be biased to the
input data its fed.  The second point took me a long time to get-around to
accepting but I think I've finally got it. I want to say first and foremost if
the world were split into ["fuzzy" and
"techie"](https://undergrad.stanford.edu/events/fuzzy-and-techie-false-divide)
,lets just say it is, then I'm ultimately a "techie". I've tried being "fuzzie"
and I can pass but it's not in my DNA. That's okay. The world needs both.  My
point with this though is that I'm a strong believer in science and the hunt
for truth. I was that cringey kid in middleschool who posted [Dawkins quote on
Instagram](https://slatestarcodex.com/2019/10/30/new-atheism-the-godlessness-that-failed/)
That said recently some friends have convinced me that truth is not an
attainable thing. I'm still having trouble wrapping my head around it and I'm
not fully convinced but I welcome any ideas challenging my own.  There's a lot
that can be said about the construction of truth and wether it's tied with our
physiological understanding, or how truth relates to the
[hyperreal](https://plato.stanford.edu/entries/baudrillard/) but actually none
of that is what's helped convince me that truth is perhaps not attainable. 

In fact, oddly enough, it was [**Pizza Gate**](https://en.wikipedia.org/wiki/Pizzagate_conspiracy_theory) The most
insane thing is I actually remember browsing **/r/TD** back when they were
forming this theory and I was thinking no way. I'm sure you can find the post
now somewhere on the internet archive but I vaguaely remember them relating the
signage to some pedophilia ring...

I don't want to dwell on the details of it too much. It seems when ever the
internet spills over into reality bad things happen. However, the point is
everyone involved or believes in **Pizza Gate** believes it is the truth.
Before talking with my friend I coud *buy* the argument that people involved in
**Pizza Gate** perhaps believed it's true but once it all went down surely all
the possibility realites collaped and the truth made it out. Surely right?  And
yet I couldn't be more wrong. The reality, or I should say our reality, didn't
really affect those who believed in it. What's more is all rhetorical tools we
perform science with the research, the facts, the evidence, etc. those same
tools are used by these believers. That's what makes them so convinced. They're
essentially conducting their own bad science experiments. So the quandry I
faced was I don't really have a good algorithmic mechanism for discerning my
truth from their *truth* besides like a gut feeling that it's an obvious case
of [occam's razor](https://en.wikipedia.org/wiki/Occam%27s_razor) even then I'm
not sure that'd hold up in formal verification. So that's where I currently am
in my thinking kinda stuck in a rut between the world I love and know and
somehow having to fit these other-truthers into the model. I'm sure a lot of
people would wave them off as crazies, we can't listen to them, and generally
disregard them.  However, I don't think this is a good solution either. Their
sentiment and distrust of the way things are actually mimicked in a lot of
leftist circles. I can't really cite specific cases right now but just take the
general case of distrusting the government and its easy to see how to paths
evolve from there. And honestly, I kinda totally get it. Take all the latest
craze about **5G**. It does sound a little ominous at face value doesn't?  And
I do find the memes about it really funny but I feel privileged enough to have
been given the tools to understand the *modern* world around me. But I could
totally relate to seeing things go to fast and say wait a minute, hold up
**WHAT‽**

Okay there's more I want to say here but I have to move on to the crux of this.


## The Entrée 

So I do want to develop this more but on the high chance I don't I want to get what I have currently cooked up out. 

So what's the problem with Facebook? Lots of people have said lots of things I'm sure, but let me give you my hot take. This is the entrée after all.
Facebook has abysmal content moderation. Like practically non-existent. So what do I mean here. I feel there's two kinds of content-moderation

1. Human admins
2. The consumers

It definitely would not kill me to make those better terms but you get the
idea. When we talk about online formums human admins are the weird people who
just moderate, who knows why. They often have cool special badges (more on
this later) and they are the moral arbitrers of what content gets to be
discussed etc. These generally should be avoided for the same reason we should
avoid facists or family reunions with strong patriarchs. Even in your online
forum about gardening the power can go to the head of mods. There aren't a lot
of great mechanisms right now for removing rouge mods. The most common is you
go to the **SUPER USER** and you go hey this mod is abusing their privileges
and then you honestly hope that the admins have mercy on you and take care of
it. Admins are incentivized to help you because they usually have a real
interest (real == finacial) in the success of the platform and so they want as
many users as possible. Admins more or less are benevolent, as its in their
best interest.
[Here]("https://www.reddit.com/r/announcements/comments/5frg1n/tifu_by_editing_some_comments_and_creating_an/")
you can see what happens. When this happened it was huge I remember **/r/TD**
calling for */u/spez* to step down and encroachment of their freedom of speech.
The thing is, on the internet as long as we're transacting through private
platforms we're really subject to their TOS. 

So yes human moderators can be evil. [But they also can be good](https://www.vice.com/en_us/article/avyjkz/virgil-texas-white-power-facebook-group-troll).
They post announcements and teams of them make important decisions and they
generally keep forums very nice. They're grounds keepers for communities Reddit
is cool because a lot of moderators can be bots that perform automated helpful
tasks.  When you find a bot that's useful you can even say "good bot" and then
[another bot comes](https://www.reddit.com/user/goodbot_badbot) around and
keeps score, like a digital dog treat. 

Anyways the point is moderators are probably a necessary evil to online forums.
Going back to the design of facebook they're are moderators but their positions
aren't well incentivized.  If you're in a facebook group its the job of the
moderator to control posts and stuff and keep everything on topic but for all
the work they do they get to pin posts and get a little tag. Furthermore, they
don't even get robot slaves to do a lot of the menial work for them. This leads
to poor group interactions on Facebook and it's the reason that people don't
really use Facebook for more informationy things like they do
dedicated-forums. And you know what, I think Facebook is okay with that so
that's why they haven't put a lot of work into group moderation. When I go to a
facebook group I have a feeling like I'm in that part of the Percy Jackson
books where he goes into a casino and they try and keep him forever. I feel so
disoriented with all the out of order posting. 

Okay so I think we all agree upon how moderators are driven by incentives to do
a good job moderating. However there's another part to moderating that's even
more important. Designated moderators (and admins) should function like a
safety-net and only step in when necessary and maintain a nice community. The
more important moderators on internet forums are the people themselves. A good
internet forum gives people the power to police themselves and form complex
organizations. In the following bit I want to compare and contrast how various
online forums hande this.

### Reddit 
    upvotes and downvotes ...
    Recently added rewards which are monetized? --> not good
### Stack Exchange
    Probably the absolute best ...
### Facebook

 So this is like a case study in how not to do a good job with the tools for self moderation.




# Anonymity and Minority and other words ending in -ity

The impetus for this post comes from a conversation I had with a friend and a reflection on recent events
(6/11/20). For variou stechnical reasons that we'll skip over I attended both The Bronx Highschool of Science 
and Stuyvesant Highschool. Two very competitive and selective *public* highschools in NYC. If you ranked schools on where they got kids into
college then these schools would easily rank in the top-10 in the country. Especially if you factor out athletic admits, legacy, and other special consideration based
admissions.

My point is Stuyvesant (and Bronx Science) both have a major issue with race. I'm not going to delve into it here you can read over it here
but the point is there are very very very few **PoC** students at either of these schools. Like, single digit levels. 

At the same time I saw on Instagram an infographic about Stuyvesant's race issue and it cited that there are something like 7 black students. I thought wow,
the pressure they must endure. Not only are they dealing with Stuyvesant and being a teenager and college and all of that but they don't really have any anonymity.
When people talk about black students at Stuyvesant or Bronx Science there's only so many kids they can be talking about. 

I would like to relate another story shared to me by a friend 

>
> Type highkey My professor was talking about this Like [college] put out a survey An anonymous survey for professors to respond if they felt comfortable working on campus in the fall And they asked ethnicity and which building they worked in And my professor is Puerto rican And the only Hispanic person who works in his building So the survey was really only anonymous if you are white Its pretty fucked up and just another example of white privilege We just n r ver have to question if data is going to deanonymize us Well I mean sometimes I think about that just cause I'm a security nut But its not really a risk to me in comparison to minories and that type of data collection is so widely prevalent nowadays it requires yet another dimension of hypervigilence for minorities to keep themselves safe 
>

