import PropTypes from "prop-types";
function Button({ children, disabled }) {
  return (
    <button
      disabled={disabled}
      className="disabled:cusrosr-not-allowed inline-block rounded-full bg-yellow-400 px-4 py-3 py-4 font-semibold uppercase tracking-wide text-stone-800 transition-colors duration-300 hover:bg-yellow-300 focus:outline-none focus:ring focus:ring-yellow-300 focus:ring-offset-2 sm:px-6 sm:py-4"
    >
      {children}
    </button>
  );
}
Button.propTypes = {
  children: PropTypes.node.isRequired,
  disabled: PropTypes.bool,
};

export default Button;
