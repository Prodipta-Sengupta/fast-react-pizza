import PropTypes from "prop-types";
import { Link } from "react-router-dom";
function Button({ children, disabled, to, onClick }) {
  const className =
    "disabled:cusrosr-not-allowed inline-block rounded-full bg-yellow-400 px-4 py-3 font-semibold uppercase tracking-wide text-stone-800 transition-colors duration-300 hover:bg-yellow-300 focus:outline-none focus:ring focus:ring-yellow-300 focus:ring-offset-2 sm:px-6 sm:py-4";
  if (to)
    return (
      <Link to={to} className={className}>
        {children}
      </Link>
    );
  if (onClick)
    return (
      <button onClick={onClick} className={className}>
        {children}
      </button>
    );
  return (
    <button disabled={disabled} className={className}>
      {children}
    </button>
  );
}
Button.propTypes = {
  children: PropTypes.node.isRequired,
  disabled: PropTypes.bool,
  to: PropTypes.string,
  onClick: PropTypes.func,
};

export default Button;
