import { Hero } from '../components/sections/Hero/Hero';
import { ProblemSolution } from '../components/sections/ProblemSolution/ProblemSolution';
import { Team } from '../components/sections/Team/Team';
import { WhyUs, Roadmap, Approach, BusinessModel } from '../components/sections/SimpleSections';
import { RequestDemo } from '../components/sections/RequestDemo/RequestDemo';

export const HomePage = () => {
  return (
    <>
      <Hero />
      <ProblemSolution />
      <Team />
      <WhyUs />
      <Roadmap />
      <Approach />
      <BusinessModel />
      <RequestDemo />
    </>
  );
};
