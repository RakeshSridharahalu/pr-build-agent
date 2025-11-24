export default function GoodAccessibility() {
  return (
    <div>
      <h1>Accessible Page</h1>
      <label htmlFor="name">Name</label>
      <input id="name" />
      <button aria-label="Submit Form">Submit</button>
    </div>
  );
}