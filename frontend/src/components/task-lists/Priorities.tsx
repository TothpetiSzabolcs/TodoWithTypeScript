type Props = {
  priority: string;
};

const Priorities = ({ priority }: Props) => {
  if (priority === "Low") {
    return <span>🟢 {priority} priority</span>;
  } else if (priority == "Medium") {
    return <span>🟡 {priority} priority</span>;
  } else if (priority === "High") {
    return <span>🔴 {priority} priority</span>;
  }
};

export default Priorities;
