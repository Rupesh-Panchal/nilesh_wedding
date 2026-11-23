import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import SectionHeading from "./ui/SectionHeading";
import { Mandala, ScallopEdge, Divider } from "./ornaments/decor";
import { IconCalendar, IconClock, IconDiya, IconSparkle } from "./ornaments/icons";

/* Countdown tile: an arch-shaped niche, like a lamp alcove in a temple wall */
const CountdownBox = ({ value, label }) => (
    <div className="flex w-[4.3rem] shrink-0 flex-col items-center sm:w-[5.4rem] md:w-28">
        <div className="relative w-full rounded-t-[999px] rounded-b-xl bg-gilt p-[2px] shadow-glow">
            <div className="flex aspect-[4/5] w-full flex-col items-center justify-center rounded-t-[999px] rounded-b-[0.65rem] bg-night">
                <span className="font-heading text-[1.65rem] leading-none tabular-nums text-gilt sm:text-4xl md:text-5xl">{String(value).padStart(2, "0")}</span>
                <span className="mt-1.5 h-px w-5 bg-gold-light/50 md:w-7" aria-hidden="true" />
            </div>
        </div>
        <span className="mt-2.5 text-sm text-gold-light md:text-base">{label}</span>
    </div>
);

const DetailPanel = ({ icon: Icon, label, value, sub }) => (
    <div className="flex w-full flex-col items-center rounded-2xl border border-gold-light/35 bg-oxblood/60 px-5 py-5 backdrop-blur-sm transition-colors duration-300 hover:border-gold-light/80 sm:w-72">
        <Icon className="h-9 w-9 text-gold-light" strokeWidth={1.4} />
        <span className="mt-2 text-sm text-gold-light/80 md:text-base">{label}</span>
        <span className="mt-1 font-heading text-2xl leading-9 text-ivory sm:text-[1.7rem]">{value}</span>
        <span className="mt-1 text-sm text-ivory/65 md:text-base">{sub}</span>
    </div>
);

const MuhurtSection = () => {
    const { t } = useTranslation("muhurt");

    const targetDate = new Date(2026, 11, 5, 12, 17, 0).getTime();

    const calculateTimeLeft = () => {
        const distance = targetDate - new Date().getTime();
        if (distance <= 0) {
            return { days: 0, hours: 0, minutes: 0, seconds: 0, completed: true };
        }
        return {
            days: Math.floor(distance / (1000 * 60 * 60 * 24)),
            hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
            minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
            seconds: Math.floor((distance % (1000 * 60)) / 1000),
            completed: false,
        };
    };

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft);

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);
        return () => clearInterval(timer);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const googleCalendarLink =
        "https://calendar.google.com/calendar/render?action=TEMPLATE&text=Nilesh+%26+Jyotsna+Wedding&dates=20261205T064700Z/20261205T100000Z&details=Shubh+Vivah+of+Nilesh+and+Jyotsna&location=Mumbai";

    return (
        // Chapter three: night falls and the lamps are lit. Scalloped edges carry the visitor in and out.
        <div className="relative my-6 md:my-10">
            <ScallopEdge position="top" fill="#3a0409" />

            <section id="muhurt-section" className="relative w-full overflow-hidden bg-oxblood bg-jali py-20 text-ivory md:py-28">
                {/* Warm lamp-light behind the countdown */}
                <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-[58%] h-[46rem] w-[46rem] max-w-[160vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(232,148,26,0.28)_0%,rgba(58,4,9,0)_65%)]" />
                <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-[56%] aspect-square w-[min(150vw,56rem)] -translate-x-1/2 -translate-y-1/2 text-gold-light/[0.14] wedding-rotate-reverse">
                    <Mandala />
                </div>

                <IconDiya aria-hidden="true" className="pointer-events-none absolute left-[7%] top-24 hidden h-14 w-14 animate-lotus-float text-gold-light/60 lg:block" strokeWidth={1.1} />
                <IconDiya aria-hidden="true" className="pointer-events-none absolute right-[7%] top-24 hidden h-14 w-14 animate-lotus-float text-gold-light/60 [animation-delay:1.5s] lg:block" strokeWidth={1.1} />

                <div className="relative z-10 mx-auto w-full max-w-4xl px-4 md:px-6">
                    <SectionHeading icon={IconDiya} tone="light" title={t("title")} subtitle={t("description")} />

                    <p className="mx-auto mt-4 max-w-2xl text-center text-base italic leading-8 text-gold-light md:text-lg">{t("subtext")}</p>

                    <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6">
                        <DetailPanel icon={IconCalendar} label={t("dateLabel")} value={t("dateValue")} sub={t("dayValue")} />
                        <DetailPanel icon={IconClock} label={t("timeLabel")} value={t("timeValue")} sub={t("timeSubtext")} />
                    </div>

                    <div className="mt-14 flex flex-col items-center">
                        <div className="flex items-center justify-center gap-3 text-center">
                            <IconSparkle className="h-5 w-5 text-gold-light" strokeWidth={1.4} />
                            <p className="text-lg text-gold-light md:text-xl">{timeLeft.completed ? t("completedLabel", "शुभविवाह संपन्न") : t("countdownLabel")}</p>
                            <IconSparkle className="h-5 w-5 text-gold-light" strokeWidth={1.4} />
                        </div>

                        {!timeLeft.completed ? (
                            <div className="mt-7 flex w-full flex-nowrap items-start justify-center gap-2 sm:gap-4 md:gap-6" role="timer" aria-live="off">
                                <CountdownBox value={timeLeft.days} label={t("days")} />
                                <CountdownBox value={timeLeft.hours} label={t("hours")} />
                                <CountdownBox value={timeLeft.minutes} label={t("minutes")} />
                                <CountdownBox value={timeLeft.seconds} label={t("seconds")} />
                            </div>
                        ) : (
                            <p className="py-8 text-center font-heading text-2xl leading-[1.6] text-gilt md:text-3xl">{t("completedMessage", "नवदाम्पत्यास मंगलमय शुभेच्छा!")}</p>
                        )}
                    </div>

                    <div className="mt-12 flex flex-col items-center">
                        <a href={googleCalendarLink} target="_blank" rel="noopener noreferrer" className="btn-gold w-full sm:w-auto">
                            <IconCalendar className="h-6 w-6 shrink-0" />
                            <span>{t("addToCalendar")}</span>
                        </a>
                        <Divider tone="light" className="mt-12" />
                    </div>
                </div>
            </section>

            <ScallopEdge position="bottom" fill="#3a0409" />
        </div>
    );
};

export default MuhurtSection;
