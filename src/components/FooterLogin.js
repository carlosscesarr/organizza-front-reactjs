import { Link } from "react-router-dom";
import { GithubIcon, LinkedinIcon } from "./../icons";

export default function FooterLogin() {
  return (
    <div className="absolute right-0 w-full flex flex-col items-center justify-center bottom-16">
      <div>
        <h1 className="mb-4 font-semibold text-gray-600">
          Desenvolvido por César Lima Dev.
        </h1>
      </div>
      <div className="flex">
        <a
          target="_blank"
          title="Github do projeto"
          href="https://github.com/carlosscesarr/organizza-front-reactjs"
          className="mr-3 text-gray-600"
        >
          <GithubIcon className="w-6 h-6" />
        </a>
        <a
          target="_blank"
          title="Linkedin"
          href={{pathname: "https://www.linkedin.com/in/cesarlimadev/"}}
          className="text-gray-600"
        >
          <LinkedinIcon className="w-6 h-6" />
        </a>
      </div>
    </div>
  );
}
