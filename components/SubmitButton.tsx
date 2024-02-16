const SubmitButton = ({ loading }: { loading: boolean }) => {
  return (
    <button
      type="submit"
      disabled={loading}
      className="mt-4 bg-[#4b5562] w-32 mx-auto text-white hover:bg-gray-700 px-3 py-2 rounded-md transition-colors duration-300"
    >
      {loading ? "Submitting..." : "Submit"}
    </button>
  );
};

export default SubmitButton;
