const PersianNumber = ({ children }) => {
  const toPersianDigits = (value) => {
    if (value == null) return "";
    const str = value.toString();
    return str.replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[d]);
  };

  return <>{toPersianDigits(children)}</>;
};

export default PersianNumber;
