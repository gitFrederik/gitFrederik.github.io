import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { ReadingProgress } from "@/components/ReadingProgress";
import { Toc } from "@/components/Toc";
import {
  AIHierarchy,
  RLLoop,
  BanditBars,
  BlendedFlow,
} from "@/components/essay/EssayVisuals";

export const metadata: Metadata = {
  title: "Towards Adaptive Learning Systems — Frederik Willemsen",
  description:
    "An essay on the potential of Reinforcement Learning in eLearning systems — from Duolingo bandits to blended learning.",
};

const TOC = [
  { id: "introduction", label: "Introduction" },
  { id: "background", label: "Background" },
  { id: "rl-in-education", label: "RL in Education" },
  { id: "existing-research", label: "Existing Research" },
  { id: "challenges", label: "Challenges & Limitations" },
  { id: "opportunities", label: "Opportunities & Future" },
  { id: "references", label: "References" },
];

function Cite({ n }: { n: number }) {
  return (
    <a className="cite" href={`#ref-${n}`} aria-label={`Reference ${n}`}>
      [{n}]
    </a>
  );
}

export default function EssayPage() {
  return (
    <>
      <ReadingProgress />

      <article className="essay">
        <header className="essay__hero">
          <div className="container container-narrow">
            <Reveal>
              <div className="essay__eyebrow">
                <Link href="/notes">Notes</Link>
                <span aria-hidden="true">·</span>
                <span>Essay</span>
                <span aria-hidden="true">·</span>
                <span>May 21, 2026</span>
              </div>
              <h1 className="essay__title">
                Towards Adaptive Learning Systems<span className="essay__period">.</span>
              </h1>
              <p className="essay__dek">
                The potential of Reinforcement Learning in eLearning systems.
              </p>
              <div className="essay__meta">
                <span><strong>By</strong> Frederik Willemsen</span>
                <span><strong>Reading</strong> ~12 min</span>
                <span><strong>Sources</strong> 20 references</span>
              </div>
            </Reveal>
          </div>
        </header>

        <div className="container essay__layout">
          <Toc items={TOC} />

          <div className="essay__body">

            {/* ===== 1. INTRODUCTION ===== */}
            <Reveal as="section" id="introduction" className="essay-section">
              <h2 className="essay-h2"><span className="essay-h2__num">01</span> Introduction</h2>
              <p className="essay-lead">
                <span className="dropcap">W</span>ith the uprising of improving Artificial Intelligence algorithms
                and more available datasets to train these algorithms on, the implementation of Reinforcement
                Learning into eLearning systems has become a recent trend. E-learning systems gained enormous
                popularity during the COVID-19 pandemic when schools had to be closed, and people had to go
                online in order to educate themselves. Duolingo and Babbel are examples of e-learning systems used
                to learn languages, but many more platforms, like Moodle or Kahoot, exist where you can start to
                educate yourself online.
              </p>
              <p>
                As platforms like Duolingo have millions of users, the question arose of how to optimize the
                learning experience for each of the users, to make learning more fun, easy, and accessible.
                Reinforcement Learning offers a lot of possibilities to tackle these problems, with advanced
                algorithms and a lot of data that is collected on these online platforms such as in Duolingo
                <Cite n={1} />, it might just be a perfect solution to make learning more fun and personalized.
              </p>
              <blockquote className="pull-quote">
                <p>
                  Traditionally, learning &mdash; and especially education &mdash; have been a system stuck without progress.
                  The same answers and the same questions are provided to people with different levels of knowledge.
                  May this be the most optimal way to learn? Unlikely.
                </p>
              </blockquote>
              <p>
                This article is a review of the potential Reinforcement Learning has in eLearning Systems, to make
                learning more adaptive, efficient, and fun.
              </p>

              <AIHierarchy />
            </Reveal>

            {/* ===== 2. BACKGROUND ===== */}
            <Reveal as="section" id="background" className="essay-section">
              <h2 className="essay-h2"><span className="essay-h2__num">02</span> Background</h2>

              <h3 className="essay-h3">eLearning and adaptive systems</h3>
              <p>
                E-Learning systems are defined as all forms of online electronic-supported systems that enable the
                opportunity to learn and teach. Furthermore, e-learning systems should aid the construction of
                knowledge, practice, and individual experience of the learner. Thereby, the electronic devices used
                serve as media to implement the learning process. What makes an e-learning system <em>adaptive</em>
                {" "}is its capability to track the learner&apos;s knowledge, style, preferences, and behaviours over
                time. With this learned data, an adaptive system would be able to use AI/ML to tailor the content
                to the learner and suggest an optimal learning path, analyse weaknesses, and adjust the learning
                process and difficulty to the learner&apos;s level in real time <Cite n={2} />.
              </p>

              <h3 className="essay-h3">Basics of Reinforcement Learning</h3>
              <p>
                Reinforcement Learning is a method in machine learning. It focuses on how agents can learn to make
                decisions through interaction with an environment to maximise the cumulative reward function over
                time. While Supervised Learning relies on labeled data, and Unsupervised Learning uncovers hidden
                patterns, Reinforcement Learning learns optimal actions through trial and error without explicit
                instructions <Cite n={3} />.
              </p>
              <p>
                Reinforcement Learning therefore suffers under the <em>exploration-exploitation</em> trade-off,
                which refers to the decision dilemma between exploring new states &mdash; which could be less optimal
                than a known action &mdash; and exploiting an already known action that is guaranteed to return the best
                reward under all the currently known actions <Cite n={3} />.
              </p>

              <RLLoop />

              <div className="defs">
                <div className="def">
                  <div className="def__k">State</div>
                  <div className="def__v">The part of the environment at a particular moment &mdash; the situation the agent is in.</div>
                </div>
                <div className="def">
                  <div className="def__k">Action</div>
                  <div className="def__v">At any state, the agent can choose from multiple actions to take.</div>
                </div>
                <div className="def">
                  <div className="def__k">Reward</div>
                  <div className="def__v">For any action taken in a state, the agent receives a reward telling it how good or bad the action was.</div>
                </div>
                <div className="def">
                  <div className="def__k">Discount factor</div>
                  <div className="def__v">Controls how important future rewards are compared to immediate rewards <Cite n={4} />.</div>
                </div>
              </div>

              <h3 className="essay-h3">Pedagogical theories</h3>
              <p>
                Adaptive eLearning systems are the most effective when they support established theories from
                pedagogical research and are focused on the learner and their user experience. In
                {" "}<em>Constructivism</em>, learners should build knowledge through experience and interaction, as
                learning is seen as an active process; this aligns with adaptive technologies such as eLearning
                systems <Cite n={5} />. Additionally, <em>Mastery Learning</em> states that given enough time and
                effort, all learners can achieve a high level of understanding <Cite n={6} />. Reinforcement
                Learning can help here by adjusting the difficulty.
              </p>
            </Reveal>

            {/* ===== 3. RL IN EDUCATION ===== */}
            <Reveal as="section" id="rl-in-education" className="essay-section">
              <h2 className="essay-h2"><span className="essay-h2__num">03</span> Reinforcement Learning in Education</h2>

              <h3 className="essay-h3">Use cases of RL applications in eLearning</h3>
              <p>
                Reinforcement Learning can be applied across a wide range of tasks in e-learning. A few of the
                potential tasks where it is studied to be used:
              </p>

              <ol className="usecases">
                <li>
                  <div className="usecase__k">Curriculum sequencing</div>
                  <div className="usecase__v">
                    Determine the most effective sequence in which learning material should be presented to the
                    student to maximise learning gains. <Cite n={7} /> explored how to optimise teaching with RL
                    by modeling it as a POMDP.
                  </div>
                </li>
                <li>
                  <div className="usecase__k">Adaptive feedback</div>
                  <div className="usecase__v">
                    Adapt feedback timing and content based on previous behaviour and interaction of the student.
                    The goal is to help learners with the right information at the right time. <Cite n={8} />{" "}
                    studied how RL-driven feedback improves problem solving in physics tutoring systems.
                  </div>
                </li>
                <li>
                  <div className="usecase__k">Dynamic difficulty adjustment</div>
                  <div className="usecase__v">
                    Adapt the difficulty level in real time to match the student&apos;s ability, reducing
                    frustration and enhancing engagement. In <Cite n={9} />, RL-tuned visual memory games led to
                    better engagement and outcomes.
                  </div>
                </li>
                <li>
                  <div className="usecase__k">Spaced repetition</div>
                  <div className="usecase__v">
                    RL agents trained to suggest when to review learning material such that long-term memorisation
                    is maximised.
                  </div>
                </li>
              </ol>

              <h3 className="essay-h3">Techniques used</h3>
              <p>
                A multitude of different RL strategies are used in e-learning, which depend on the context and the
                intended implementation, as well as various design choices. In most systems, Reinforcement Learning
                is implemented as a Markov Decision Process, which models learners&apos; progress as a sequential
                process from state to state. Techniques such as <em>Q-Learning</em> and <em>Deep Q-Networks</em> are
                most effective for modeling the states. At the same time, <em>multi-armed bandit</em> algorithms
                are used when immediate feedback and short-term planning &mdash; such as choosing optimal reminders
                or learning tips &mdash; is the goal. On top of that, offline RL methods are used for educational
                purposes, as safety and ethical constraints are important.
              </p>

              <h3 className="essay-h3">Rule-based vs. data-driven systems</h3>
              <p>
                Legacy eLearning systems rely on rule-based systems, which are designed in an if-then-else manner.
                This effectively treats all learners similarly and assumes everyone is starting from the same
                knowledge level, and does not provide personalized support features. Data-driven methods use
                machine learning or reinforcement learning to tailor feedback for the user; however, classical
                machine learning models are dependent on the goodness of their training data. Reinforcement
                Learning is therefore used to improve these systems while deployed on real interaction data. They
                dynamically learn optimal decisions, based on long-term learning outcomes, and then suggest the
                best decision for each learner. Research has shown that data-driven systems often outperform
                rule-based systems &mdash; a study about adaptive learning in higher education <Cite n={10} /> showed
                that personalized feedback increased academic performance and student engagement.
              </p>
            </Reveal>

            {/* ===== 4. EXISTING RESEARCH ===== */}
            <Reveal as="section" id="existing-research" className="essay-section">
              <h2 className="essay-h2"><span className="essay-h2__num">04</span> Existing Research</h2>

              <h3 className="essay-h3">Case studies</h3>
              <p>
                In <Cite n={11} />, the authors describe how a multi-armed bandit algorithm &mdash; a type of RL
                algorithm &mdash; is used in Duolingo to send personalized push notifications. These daily push
                notifications are selected by a multi-armed bandit system to maximise engagement with the app. The
                algorithm is context-aware, which means a user with a daily streak is more likely to get a
                notification to keep their streak than a user who does not have one. Furthermore, the algorithm
                introduced a <em>recency penalty</em>, meaning that reminders get more effective the longer they
                have not been used.
              </p>
              <p>
                The deployment of these measures led to a measurable increase in user engagement, lesson
                completions, and daily active users. The RL algorithm works in production and is used daily to
                suggest automated messages for millions of Duolingo users. Testing showed that
                {" "}<strong>0.4%</strong> more lessons were completed, and new-user retention increased by
                approximately <strong>2%</strong> compared to the baseline.
              </p>

              <BanditBars />

              <p>
                In another paper, <Cite n={12} />, the author implemented a Reinforcement Learning pipeline that
                personalizes the order of questions for each learner. This was achieved by framing the problem as
                a Markov Decision Process, where states represent the student&apos;s knowledge, actions are the
                selection of the next questions, and rewards are based on correctness and engagement of the
                learner. For training and testing, the EdNet dataset was used, without live deployment. The
                pipeline serves as a proof-of-concept, showing how such a system could work and which design
                principles matter for performance and generalisation. The author demonstrated that an RL policy
                can be used effectively in eLearning systems &mdash; under the assumption that state representations
                are well-designed &mdash; and highlighted the importance of feature engineering in educational RL.
              </p>
              <p>
                On top of that, <Cite n={13} /> looks at how applied deep RL can be used to provide feedback,
                hints, or explanations in an intelligent tutoring system. The system seeks to learn when students
                need help during their assignments and gives feedback at the right moment to maximise cognitive
                learning. Furthermore, it seeks to creatively explain ideas rather than encouraging clicking and
                guessing, enhancing engagement and deeper thinking. It learns from past interactions to decide on
                the best moment to offer guidance, instead of following strict intervals. Trained on real student
                data, the system did a better job at providing feedback than a human tutor following preset
                strategies &mdash; a striking demonstration of adaptive ML outperforming human action by providing
                help only when needed.
              </p>
            </Reveal>

            {/* ===== 5. CHALLENGES ===== */}
            <Reveal as="section" id="challenges" className="essay-section">
              <h2 className="essay-h2"><span className="essay-h2__num">05</span> Challenges and Limitations</h2>
              <p>
                The large-scale deployment of Reinforcement Learning has already begun with leading companies like
                Duolingo implementing it to optimise push notifications. In more traditional domains in education,
                it is still more difficult to implement.
              </p>

              <h3 className="essay-h3">Deployment challenges</h3>
              <p>
                RL algorithms return better results on larger data samples than on smaller ones. This is a result
                of the exploration-exploitation trade-off: with fewer states to explore, the algorithm finds the
                best option available faster, but the overall results might still be suboptimal. RL algorithms,
                like all data-driven methods, are extremely data hungry; therefore, it is also extremely important
                how the states are modeled for optimal results. In educational institutions, harnessing a huge
                amount of data might clash with privacy concerns. Effective data collection might also be a
                problem in developing countries, which can lead to worse results <Cite n={14} />.
              </p>

              <h3 className="essay-h3">Privacy and ethical concerns</h3>
              <p>
                Machine learning methods are hungry for data; they need it to improve the models and be more
                accurate. If you interact with a chatbot, your data will be saved and processed to improve the
                algorithms &mdash; and often sold to third parties. You actually do not own your data on some online
                platforms, where you transfer your copyright when uploading something. Digital assistants like
                Amazon&apos;s &ldquo;Alexa&rdquo; have been shown to be exploitable to privacy risks and to listen
                even when deactivated <Cite n={15} />.
              </p>
              <p>
                In the context of e-learning, this raises huge issues. While interacting with online learning
                solutions, the algorithm learns your habits, how you respond to certain actions, and your consumer
                behaviour. Your actions will be internalized in the system and used to improve the results for
                other people. Ultimately, this can lead to a surveillance that should not be expected when
                interacting with an e-learning system. If these systems collect enough data about you, this
                potentially leads to identity theft or fraud. <Cite n={16} /> outlines several security concerns
                and common privacy breaches by AI &mdash; data breaches, weak security protocols, third-party vendors,
                misuse, inadequate control of data. Other problems include the bias and inference risk these
                systems have on their training data, which can lead to worse results for minorities and favour
                certain demographics over others <Cite n={17} />.
              </p>
            </Reveal>

            {/* ===== 6. OPPORTUNITIES ===== */}
            <Reveal as="section" id="opportunities" className="essay-section">
              <h2 className="essay-h2"><span className="essay-h2__num">06</span> Opportunities and Future Directions</h2>

              <h3 className="essay-h3">Hybrid models</h3>
              <p>
                In <Cite n={18} />, the author presents the idea of <em>blended learning</em>. Blended learning
                emerged during the COVID-19 pandemic with the popularity of e-learning and &ldquo;combines online
                with offline.&rdquo; Hybrid models can be beneficial because they combine human interaction with
                the benefits of tech-driven personalization. Reinforcement learning can guide the online part of
                learning and adjust content in real time, and the offline learning part can be adjusted according
                to the suggestions of the models, with live learning data collected for further training. The
                author concludes this leads to increased autonomy and engagement, and higher cognitive, social,
                and emotional aspects. <Cite n={19} /> also especially highlighted the increased flexibility in
                &ldquo;time, pace, and mode&rdquo; of hybrid learning models.
              </p>

              <BlendedFlow />

              <h3 className="essay-h3">Conclusion</h3>
              <p>
                The goal of this review was to showcase the potential and risks Reinforcement Learning has in
                e-learning systems. It was shown that RL has already been successfully integrated in deployed
                e-learning systems &mdash; millions of users already interact with it knowingly or unknowingly. Use
                cases range from curriculum sequencing to adaptive feedback, dynamic difficulty adjustment, and
                spaced repetition. While the potential is immense, the loss of control over one&apos;s own data
                is also an intriguing problem, and should not be forgotten.
              </p>
              <p>
                Future implementations in education should focus on hybrid learning. A promising idea is blended
                learning, which combines offline with online learning and tries to optimise offline learning with
                online algorithms.
              </p>
              <blockquote className="pull-quote">
                <p>
                  Reinforcement Learning offers a powerful framework for developing smarter learning systems &mdash;
                  ones that focus more on the single person and can give more precise learning instructions. But
                  its success will depend on its integration into educational theory and the human part of
                  learning. Without total human interaction, other factors might be reduced.
                </p>
              </blockquote>
            </Reveal>

            {/* ===== REFERENCES ===== */}
            <Reveal as="section" id="references" className="essay-section essay-section--refs">
              <h2 className="essay-h2"><span className="essay-h2__num">07</span> References</h2>
              <ol className="refs">
                <li id="ref-1">
                  Bicknell, K., Brust, C., &amp; Settles, B. (2023). <em>How Duolingo&apos;s AI learns what you need to learn.</em> IEEE Spectrum. <a href="https://spectrum.ieee.org/duolingo" target="_blank" rel="noopener">spectrum.ieee.org/duolingo</a>
                </li>
                <li id="ref-2">
                  Sweta, S. (2021). <em>Adaptive E-Learning System.</em> Pages 13–24.
                </li>
                <li id="ref-3">
                  Sutton, R. S., &amp; Barto, A. G. (2018). <em>Reinforcement Learning: An Introduction.</em> 2nd ed., MIT Press.
                </li>
                <li id="ref-4">
                  Ghasemi, M., &amp; Ebrahimi, D. (2024). <em>Introduction to Reinforcement Learning.</em> arXiv:2408.07712.
                </li>
                <li id="ref-5">
                  Tam, M. (2000). <em>Constructivism, instructional design, and technology: Implications for transforming distance learning.</em> Educational Technology &amp; Society, 3.
                </li>
                <li id="ref-6">
                  Guskey, T. (2007). <em>Closing achievement gaps: Revisiting Benjamin S. Bloom&apos;s &ldquo;Learning for Mastery&rdquo;.</em> Journal of Advanced Academics, 19, 8–31.
                </li>
                <li id="ref-7">
                  Rafferty, A. N., Brunskill, E., Griffiths, T. L., &amp; Shafto, P. (2011). <em>Faster teaching by POMDP planning.</em> Artificial Intelligence in Education, 280–287, Springer.
                </li>
                <li id="ref-8">
                  Chi, M., Vanlehn, K., Litman, D., &amp; Jordan, P. (2011). <em>Empirically evaluating the application of reinforcement learning to the induction of effective and adaptive pedagogical strategies.</em> User Model. User-Adapt. Interact., 21, 137–180.
                </li>
                <li id="ref-9">
                  Rahimi, M., Moradi, H., Vahabie, A., &amp; Kebriaei, H. (2023). <em>Continuous reinforcement learning-based dynamic difficulty adjustment in a visual working memory game.</em>
                </li>
                <li id="ref-10">
                  du Plooy, E., Casteleijn, D., &amp; Franzsen, D. (2024). <em>Personalized adaptive learning in higher education.</em> Heliyon, 10(21), e39630.
                </li>
                <li id="ref-11">
                  Yancey, K. P., &amp; Settles, B. (2020). <em>A sleeping, recovering bandit algorithm for optimizing recurring notifications.</em> Proceedings of KDD &apos;20, 3008–3016. ACM.
                </li>
                <li id="ref-12">
                  Azhar, A. Z., Segal, A., &amp; Gal, K. (2022). <em>Optimizing representations and policies for question sequencing using reinforcement learning.</em> Proceedings of EDM 2022.
                </li>
                <li id="ref-13">
                  Fahid, A. A., &amp; Chi, M. T. H. (2021). <em>Adaptively scaffolding cognitive engagement with batch constrained deep Q-networks.</em> AIED 2021, LNCS 12748, 280–292.
                </li>
                <li id="ref-14">
                  Dake, D. (2023). <em>Reinforcement learning in education 4.0: Open applications and deployment challenges.</em> International Journal of Computer Science and Information Technology, 15, 47–61.
                </li>
                <li id="ref-15">
                  Bartneck, C., Lütge, C., Wagner, A., &amp; Welsh, S. (2021). <em>Privacy Issues of AI.</em> Pages 61–70.
                </li>
                <li id="ref-16">
                  Paul, J. (2024). <em>Privacy and data security concerns in AI.</em>
                </li>
                <li id="ref-17">
                  Yulianti, S. (2025). <em>The hidden bias in AI: How artificial intelligence reflects and reinforces social inequalities.</em>
                </li>
                <li id="ref-18">
                  Ma, Z. (2023). <em>Hybrid learning: A new learning model that connects online and offline.</em> Journal of Education and Educational Research, 3, 130–132.
                </li>
                <li id="ref-19">
                  Ingabire, H., &amp; Kiu Publication Extension. (2024). <em>Hybrid learning models: Combining in-person and online education effectively.</em> Pages 16–19.
                </li>
                <li id="ref-20">
                  Mon, B. F., Wasfi, A., Hayajneh, M., Slim, A., &amp; Abu Ali, N. (2023). <em>Reinforcement learning in education: A literature review.</em> Informatics, 10(3), 74.
                </li>
              </ol>
            </Reveal>

            <Reveal as="div" className="essay-footer">
              <div className="essay-footer__inner">
                <Link href="/notes" className="text-link">
                  <svg className="arrow" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ transform: "rotate(180deg)" }}>
                    <path d="M5 12h14M13 5l7 7-7 7" />
                  </svg>
                  All notes
                </Link>
                <a className="btn btn--secondary" href="/notes/towards-adaptive-learning-systems.pdf" target="_blank" rel="noopener">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                  </svg>
                  Read original PDF
                </a>
              </div>
            </Reveal>

          </div>
        </div>
      </article>
    </>
  );
}
