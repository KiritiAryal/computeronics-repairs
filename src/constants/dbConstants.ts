export const DESKTOP: string = "DESKTOP";
export const LAPTOP: string = "LAPTOP";
export const MACBOOK: string = "MACBOOK";
export const OTHERS: string = "OTHERS";
export const HARDWARE: string = "HARDWARE";
export const SOFTWARE: string = "SOFTWARE";
export const HARDWARE_REPAIR: string = "HARDWARE REPAIR";
export const HARDWARE_UPGRADE: string = "HARDWARE UPGRADE";
export const HARDWARE_REPLACEMENT: string = "HARDWARE REPLACEMENT";
export const RAM: string = "RAM";
export const SSD: string = "SSD";
export const HARD_DISK: string = "HARD_DISK";
export const SOFTWARE_INSTALLATION: string = "SOFTWARE INSTALLATION";
export const SOFTWARE_DEVELOPMENT: string = "SOFTWARE DEVELOPMENT";
export const MOTHERBOARD: string = "MOTHERBOARD";
export const SMPS: string = "SMPS";

export const ISSUES = [
  {
    id: 1,
    issueIn: HARDWARE,
    issueType: HARDWARE_REPAIR,
  },
  {
    id: 2,
    issueIn: HARDWARE,
    issueType: HARDWARE_UPGRADE,
  },
  {
    id: 3,
    issueIn: HARDWARE,
    issueType: HARDWARE_REPLACEMENT,
  },
  {
    id: 4,
    issueIn: SOFTWARE,
    issueType: SOFTWARE_INSTALLATION,
  },
  {
    id: 5,
    issueIn: SOFTWARE,
    issueType: SOFTWARE_DEVELOPMENT,
  },
];

export const ISSUE_TYPES = [
  {
    id: 1,
    issueType: HARDWARE_REPAIR,
    repairType: MOTHERBOARD,
  },
  {
    id: 2,
    issueType: HARDWARE_UPGRADE,
    repairType: RAM,
  },
  {
    id: 3,
    issueType: HARDWARE_UPGRADE,
    repairType: SSD,
  },
  {
    id: 4,
    issueType: HARDWARE_UPGRADE,
    repairType: HARD_DISK,
  },
  {
    id: 5,
    issueType: HARDWARE_REPLACEMENT,
    repairType: HARD_DISK,
  },
  {
    id: 6,
    issueType: HARDWARE_REPLACEMENT,
    repairType: RAM,
  },
  {
    id: 7,
    issueType: HARDWARE_REPLACEMENT,
    repairType: SMPS,
  },
  {
    id: 8,
    issueType: HARDWARE_REPLACEMENT,
    repairType: MOTHERBOARD,
  },
];
