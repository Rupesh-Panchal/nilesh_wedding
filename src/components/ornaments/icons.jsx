
/* ==========================================================================
   Wedding icon set
   One consistent visual language: 32px grid, 1.5px rounded line, currentColor.
   Every icon is chosen for what it means at a Maharashtrian wedding.
   ========================================================================== */

const Icon = ({ children, className = "w-6 h-6", strokeWidth = 1.5, viewBox = "0 0 32 32", ...rest }) => (
    <svg
        viewBox={viewBox}
        fill="none"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
        aria-hidden="true"
        focusable="false"
        {...rest}
    >
        {children}
    </svg>
);

/** Two interlocked rings with a gem: the union */
export const IconRings = (p) => (
    <Icon {...p}>
        <circle cx="11.5" cy="20" r="7.5" />
        <circle cx="20.5" cy="20" r="7.5" />
        <path d="M12.8 5.2h6.4l2 3.2-5.2 5.4-5.2-5.4z" />
        <path d="M10.8 8.4h10.4M16 5.2l-1.6 3.2L16 13.8l1.6-5.4z" strokeWidth="1" />
    </Icon>
);

/** Calendar with a heart on the date: the wedding day */
export const IconCalendar = (p) => (
    <Icon {...p}>
        <rect x="4" y="6" width="24" height="22" rx="3.5" />
        <path d="M10.5 3v6M21.5 3v6M4 12.5h24" />
        <path d="M16 24.2c-4.2-2.7-6-4.8-6-6.9a3.1 3.1 0 0 1 6-1.2 3.1 3.1 0 0 1 6 1.2c0 2.1-1.8 4.2-6 6.9z" />
    </Icon>
);

/** An auspicious-hour clock: a sun-dial with petals */
export const IconClock = (p) => (
    <Icon {...p}>
        <circle cx="16" cy="16" r="10" />
        <path d="M16 9.5V16l4.4 2.6" />
        <path d="M16 2.5v2.4M16 27.1v2.4M2.5 16h2.4M27.1 16h2.4M6.5 6.5l1.7 1.7M23.8 23.8l1.7 1.7M25.5 6.5l-1.7 1.7M8.2 23.8l-1.7 1.7" strokeWidth="1.2" />
    </Icon>
);

/** Map pin with a lotus inside: the venue */
export const IconPin = (p) => (
    <Icon {...p}>
        <path d="M16 29.5s9.5-8.4 9.5-16a9.5 9.5 0 1 0-19 0c0 7.6 9.5 16 9.5 16z" />
        <path d="M16 17.8c-2.6-1.7-2.6-4.6 0-6.6 2.6 2 2.6 4.9 0 6.6z" />
        <path d="M16 17.8c-3.5.1-5.1-1.9-5.3-4.2 2.6 0 4.5 1.3 5.3 4.2zM16 17.8c3.5.1 5.1-1.9 5.3-4.2-2.6 0-4.5 1.3-5.3 4.2z" strokeWidth="1.2" />
    </Icon>
);

/** Four-point star compass: directions */
export const IconCompass = (p) => (
    <Icon {...p}>
        <circle cx="16" cy="16" r="12.5" strokeWidth="1.1" />
        <path d="M16 6l2.7 7.3L26 16l-7.3 2.7L16 26l-2.7-7.3L6 16l7.3-2.7z" />
    </Icon>
);

/** Handset with a little heart: call the family */
export const IconPhone = (p) => (
    <Icon {...p}>
        <path d="M26.5 22.6v3.2a2.1 2.1 0 0 1-2.3 2.1 21 21 0 0 1-9.1-3.2 20.6 20.6 0 0 1-6.3-6.3A21 21 0 0 1 5.6 9.3 2.1 2.1 0 0 1 7.7 7h3.2a2.1 2.1 0 0 1 2.1 1.8c.1 1.1.4 2.1.8 3a2.1 2.1 0 0 1-.5 2.2l-1.4 1.4a17 17 0 0 0 6.3 6.3l1.4-1.4a2.1 2.1 0 0 1 2.2-.5c1 .4 2 .7 3 .8a2.1 2.1 0 0 1 1.7 2.1z" />
        <path d="M22 4.2c-1.8-1.2-3 .1-3 1.2 0 1.3 1.5 2.4 3 3.4 1.5-1 3-2.1 3-3.4 0-1.1-1.2-2.4-3-1.2z" strokeWidth="1.2" />
    </Icon>
);

/** Invitation envelope with a down arrow: download the card */
export const IconInvitation = (p) => (
    <Icon {...p}>
        <path d="M16 1.8v8.4M12.4 7l3.6 3.6L19.6 7" />
        <rect x="3.5" y="13" width="25" height="16" rx="2.5" />
        <path d="M4 14.5l12 8.5 12-8.5" />
    </Icon>
);

/** Heart with an inner curl */
export const IconHeart = (p) => (
    <Icon {...p}>
        <path d="M16 27.5C7.6 21.6 4 17.2 4 12.5a6.4 6.4 0 0 1 12-3.1 6.4 6.4 0 0 1 12 3.1c0 4.7-3.6 9.1-12 15z" />
        <path d="M9.3 12.2c.2-1.7 1.4-2.8 3-2.9" strokeWidth="1.2" />
    </Icon>
);

/** Royal crown (mukut): the groom */
export const IconCrown = (p) => (
    <Icon {...p}>
        <path d="M5 23.5 3.6 10.2l7.4 5.6L16 6l5 9.8 7.4-5.6L27 23.5z" />
        <path d="M5.2 27.5h21.6" />
        <circle cx="3.6" cy="9" r="1.3" />
        <circle cx="16" cy="4.7" r="1.3" />
        <circle cx="28.4" cy="9" r="1.3" />
        <path d="M11 20h10" strokeWidth="1.1" />
    </Icon>
);

/** Lotus: the bride */
export const IconLotus = (p) => (
    <Icon {...p}>
        <path d="M16 4.5c-4 4.8-4 10.2 0 15.5 4-5.3 4-10.7 0-15.5z" />
        <path d="M16 20.2C10 19.4 6.2 15.3 6 9.5c5 .2 9.3 3.4 10 10.7zM16 20.2c6-.8 9.8-4.9 10-10.7-5 .2-9.3 3.4-10 10.7z" />
        <path d="M16 22c-5.8.9-10.8-.6-13.4-4.6 5.4-1 11.1.4 13.4 4.6zM16 22c5.8.9 10.8-.6 13.4-4.6-5.4-1-11.1.4-13.4 4.6z" strokeWidth="1.2" />
        <path d="M8.5 26.2q7.5 3.2 15 0" strokeWidth="1.2" />
    </Icon>
);

/** Kalash with coconut and mango leaves: the invitation / beginning */
export const IconKalash = (p) => (
    <Icon {...p}>
        <path d="M10.5 14.5c-2.4 2.8-3.5 5.6-3.5 8.3a9 9 0 0 0 18 0c0-2.7-1.1-5.5-3.5-8.3z" />
        <path d="M11.5 14.5h9M12.5 11.8h7v2.7h-7z" />
        <circle cx="16" cy="7.6" r="3.2" />
        <path d="M13.2 5.4c-2.6-.6-4.4-2-5-3.6 2.7-.1 4.7 1 5.6 3zM18.8 5.4c2.6-.6 4.4-2 5-3.6-2.7-.1-4.7 1-5.6 3z" strokeWidth="1.2" />
        <path d="M11 20.5c1.7 1 3.3 1.2 5 0s3.3-1 5 0" strokeWidth="1.1" />
    </Icon>
);

/** Brass diya: the auspicious moment */
export const IconDiya = (p) => (
    <Icon {...p}>
        <path d="M3.5 17.5h25c0 5.3-5.6 9-12.5 9s-12.5-3.7-12.5-9z" />
        <path d="M16 3.5c3.2 3.7 4.8 6.4 4.8 9a4.8 4.8 0 0 1-9.6 0c0-2.6 1.6-5.3 4.8-9z" />
        <path d="M16 9.6c1 1.4 1.5 2.4 1.5 3.4a1.5 1.5 0 0 1-3 0c0-1 .5-2 1.5-3.4z" strokeWidth="1.1" />
        <path d="M11.5 29.2h9" />
    </Icon>
);

/** Burst of sparkles: celebration */
export const IconSparkle = (p) => (
    <Icon {...p}>
        <path d="M14 4l2.6 8.4L25 15l-8.4 2.6L14 26l-2.6-8.4L3 15l8.4-2.6z" />
        <path d="M25.5 3.5v5M23 6h5M26 20.5v4.5M23.8 22.8h4.4" strokeWidth="1.2" />
    </Icon>
);

/** Small garland of three blossoms: used for the little ones */
export const IconGarland = (p) => (
    <Icon {...p}>
        <path d="M2.5 8c4 9 22 9 27 0" />
        <circle cx="7.5" cy="14.4" r="3" />
        <circle cx="16" cy="18.2" r="3.4" />
        <circle cx="24.5" cy="14.4" r="3" />
        <path d="M16 21.8V27M7.5 17.6V22M24.5 17.6V22" strokeWidth="1.2" />
    </Icon>
);

/** Music note with petal ends: the wedding bhajan */
export const IconMusic = (p) => (
    <Icon {...p}>
        <path d="M12 23V7.5l14-3V19" />
        <path d="M12 12.2l14-3" />
        <ellipse cx="8.6" cy="23.4" rx="3.6" ry="3" />
        <ellipse cx="22.6" cy="19.6" rx="3.6" ry="3" />
    </Icon>
);

export const IconPause = (p) => (
    <Icon {...p}>
        <rect x="8" y="6" width="5" height="20" rx="2" />
        <rect x="19" y="6" width="5" height="20" rx="2" />
    </Icon>
);

export const IconCheck = (p) => (
    <Icon {...p} strokeWidth={2}>
        <path d="M6 17l7 7L26 9" />
    </Icon>
);

export const IconChevron = (p) => (
    <Icon {...p} strokeWidth={2}>
        <path d="M8 20l8-8 8 8" />
    </Icon>
);
