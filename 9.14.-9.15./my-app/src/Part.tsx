import { CoursePart } from "./types";

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const Part = ({ part }: { part: CoursePart }) => {
  return (
    <div>
      <p>
        <b>
          {part.name} {part.exerciseCount}
        </b>
        <br />
        {(() => {
          switch (part.type) {
            case "normal":
              return <i>{part.description}</i>;
            case "groupProject":
              return <span>project exercises {part.groupProjectCount}</span>;
            case "submission":
              return (
                <>
                  <i>{part.description}</i>
                  <br /> submit to {part.exerciseSubmissionLink}
                </>
              );
            case "special":
              return (
                <>
                  <i>{part.description}</i>
                  <br /> required skills:{" "}
                  {part.requirements.reduce(
                    (prev, current) => prev + ", " + current
                  )}
                </>
              );
            default:
              assertNever(part);
              return null;
          }
        })()}
      </p>
    </div>
  );
};

export default Part;
