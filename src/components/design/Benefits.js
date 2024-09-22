
import Section from "./Section";
import Arrow from "./assets/Arrow";
import ClipPath from "./assets/ClipPath";
import brackets from "./assets/benefits/Brackets";

import benefitCard1 from "./assets/benefits/card-1.svg";
import benefitCard2 from "./assets/benefits/card-2.svg";
import benefitCard3 from "./assets/benefits/card-3.svg";
import benefitCard4 from "./assets/benefits/card-4.svg";
import benefitCard5 from "./assets/benefits/card-5.svg";
import benefitCard6 from "./assets/benefits/card-6.svg";
import benefitIcon1 from "./assets/benefits/icon-1.svg";
import benefitIcon2 from "./assets/benefits/icon-2.svg";
import benefitIcon3 from "./assets/benefits/icon-3.svg";
import benefitIcon4 from "./assets/benefits/icon-4.svg";
import benefitImage2 from "./assets/benefits/image-2.png";

const TagLine = ({ className, children }) => {
  return (
    <div className={`tagline flex items-center ${className || ""}`}>
      {brackets("left")}
      <div className="mx-3 text-n-3">{children}</div>
      {brackets("right")}
    </div>
  );
};



const Heading = ({ className, title, text, tag }) => {
  return (
    <div
      className={`${className} max-w-[50rem] mx-auto mb-12 lg:mb-20 md:text-center`}
    >
      {tag && <TagLine className="mb-4 md:justify-center">{tag}</TagLine>}
      {title && <h2 className="h2">{title}</h2>}
      {text && <p className="body-2 mt-4 text-n-4">{text}</p>}
    </div>
  );
};



export const GradientLight = () => {
  return (
    <div className="absolute top-0 left-1/4 w-full aspect-square bg-radial-gradient from-[#28206C] to-[#28206C]/0 to-70% pointer-events-none" />
  );
};

export const benefits = [
  {
    id: "0",
    title: "Ask anything",
    text: "Lets users quickly find answers to their questions without having to search through multiple sources.",
    backgroundUrl: <GradientLight />,
    iconUrl: benefitIcon1,
    imageUrl: <GradientLight />,
  },
  {
    id: "1",
    title: "Improve everyday",
    text: "The app uses natural language processing to understand user queries and provide accurate and relevant responses.",
    backgroundUrl: "./src/assets/benefits/card-2.svg",
    iconUrl: benefitIcon2,
    imageUrl: benefitImage2,
    light: true,
  },
  {
    id: "2",
    title: "Connect everywhere",
    text: "Connect with the AI chatbot from anywhere, on any device, making it more accessible and convenient.",
    backgroundUrl: <GradientLight />,
    iconUrl: benefitIcon3,
    imageUrl: benefitImage2,
  },
];



const Benefits = () => {
  return (
    <Section id="features">
      <div className="container relative z-2">
        <Heading
          className="md:max-w-md lg:max-w-2xl"
          title="Chat Smarter, Not Harder with Brainwave"
        />

        <div className="flex flex-wrap gap-10 mb-10">
          {benefits.map((item) => (
            <div
              className="block relative p-0.5 bg-no-repeat bg-[length:100%_100%] md:max-w-[24rem] group"
              style={{
                backgroundImage: `url(${item.backgroundUrl})`, // Fixed syntax for background image
              }}
              key={item.id}
            >
              <div className="relative z-2 flex flex-col min-h-[22rem] p-[2.4rem]">
                <h5 className="h5 mb-5">{item.title}</h5>
                <p className="body-2 mb-6 text-n-3">{item.text}</p>
                <div className="flex items-center mt-auto">
                  <img
                    src={item.iconUrl}
                    width={48}
                    height={48}
                    alt={item.title}
                  />
                  <p className="ml-auto font-code text-xs font-bold text-n-1 uppercase tracking-wider">
                    Explore more
                  </p>
                  <Arrow />
                </div>
              </div>

              {item.light && <GradientLight />}

              <div
                className="absolute inset-0.5 bg-n-8"
                style={{ clipPath: "url(#benefits)" }}
              >
                <div className='block relative p-0.5 bg-no-repeat bg-[length:100%_100%] md:max-w-[24rem] transform transition-transform duration-500 hover:scale-105 hover:shadow-lg'>
                  <div
                    className={`w-full h-full bg-gradient-to-r ${item.gradient} opacity-90`}
                  ></div>
                </div>
              </div>

              <ClipPath />
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
};

export default Benefits;

