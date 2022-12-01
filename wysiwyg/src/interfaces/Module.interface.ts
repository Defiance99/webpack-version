interface Module {
  name: string;
  description: string;
  icon: string;
  simple: boolean;
  action: string | string[];
}

export default Module;
