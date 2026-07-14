import type { Metadata } from "next";
import { getSiteConfig } from "@/lib/site-config";
import TeamPhoto from "@/components/TeamPhoto";
import CTASection from "@/components/CTASection";
import Reveal from "@/components/Reveal";
import type { Doctor } from "@/lib/site-config";

const config = getSiteConfig();

export const metadata: Metadata = {
  title: "Our Team",
  description: `Meet the board-certified podiatrists and caring staff of ${config.practiceName}.`,
};

function TeamMemberCard({ member }: { member: Doctor }) {
  return (
    <article className="flex flex-col gap-6 rounded-xl border border-secondary-light bg-card p-6 shadow-sm sm:flex-row">
      <div className="w-full max-w-[220px] shrink-0">
        <TeamPhoto src={member.photo} name={member.name} />
      </div>
      <div>
        <h3 className="text-2xl">
          {member.name}
          {member.credentials && `, ${member.credentials}`}
        </h3>
        {member.title && <p className="mt-1 text-lg text-muted">{member.title}</p>}
        {member.boardCertifications.length > 0 && (
          <ul className="mt-3 flex flex-wrap gap-2">
            {member.boardCertifications.map((cert) => (
              <li
                key={cert}
                className="rounded-full bg-secondary-light px-4 py-1.5 text-base font-semibold text-primary-darker"
              >
                ✓ {cert}
              </li>
            ))}
          </ul>
        )}
        <p className="mt-4 text-lg">{member.bio}</p>
        {member.specialties.length > 0 && (
          <p className="mt-3 text-lg text-muted">
            <span className="font-semibold text-body">Focus areas:</span>{" "}
            {member.specialties.join(" · ")}
          </p>
        )}
      </div>
    </article>
  );
}

export default function TeamPage() {
  const doctors = config.doctors.filter((d) => d.role === "doctor");
  const support = config.doctors.filter((d) => d.role === "support");

  return (
    <>
      <section className="bg-cream">
        <div className="mx-auto max-w-4xl px-4 py-14 sm:px-6">
          <h1 className="text-4xl sm:text-5xl">Meet our team</h1>
          <p className="mt-5 max-w-2xl text-xl text-muted">
            Doctors and staff who take the time to know you — not just your chart.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-14 sm:px-6">
        <h2 className="text-3xl">Our doctors</h2>
        <div className="mt-8 space-y-8">
          {doctors.map((doctor) => (
            <Reveal key={doctor.name + doctor.photo}>
              <TeamMemberCard member={doctor} />
            </Reveal>
          ))}
        </div>

        {support.length > 0 && (
          <>
            <h2 className="mt-16 text-3xl">Supporting medical professionals</h2>
            <div className="mt-8 space-y-8">
              {support.map((member) => (
                <Reveal key={member.name + member.photo}>
                  <TeamMemberCard member={member} />
                </Reveal>
              ))}
            </div>
          </>
        )}
      </section>

      <CTASection heading="Come meet us in person" />
    </>
  );
}
