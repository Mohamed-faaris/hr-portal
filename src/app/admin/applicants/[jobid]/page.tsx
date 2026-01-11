import JobApplicantsClient from "../JobApplicantsClient";

interface Props {
  params: { jobid: string };
}

export default function Page({ params }: Props) {
  const { jobid } = params;
  return <JobApplicantsClient jobId={jobid} />;
}
