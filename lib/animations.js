const container = {
  hidden: {
    transition: {
      staggerChildren: 0.2,
      staggerDirection: -1,
    },
  },
  show: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    transition: { type: "spring", bounce: 0.1 },
  },
  show: { opacity: 1, transition: { type: "spring", bounce: 0.1 } },
};

const tweetsContainer = {
  hidden: {
    transition: {
      staggerChildren: 0.02,
      staggerDirection: -1,
    },
  },
  show: {
    transition: {
      staggerChildren: 0.04,
    },
  },
};

const tweetsVariants = {
  hidden: {
    opacity: 0,
    scale: 0.8,
    transition: { type: "spring", bounce: 0.4 },
  },
  show: { opacity: 1, scale: 1, transition: { type: "spring", bounce: 0.4 } },
};

export { container, itemVariants, tweetsContainer, tweetsVariants };
