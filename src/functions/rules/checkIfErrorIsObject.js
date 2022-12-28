export default function checkIfErrorIsObject(result) {
     return typeof result.data.data === 'object' ? Object.values(result.data.data) : result.data.data;
}