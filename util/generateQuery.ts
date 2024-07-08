export default function generateQuery(req) {
	const query = {}
	const { limit } = req.query
/* 	if (habits) {
		query.habits = new RegExp(name, "i")

	}
	if (breed) {
		query.breed = new RegExp(breed, "i")
	} */
  console.log(limit)
	return query
}