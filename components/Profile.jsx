import PromtCard from "./PromtCard"

const Profile = ({ name = 'Your', desc, data, handleEdit, handleDelete }) => {
  const isDataAvailable = data.length;
  return (
    <section className="w-full">
      <h1 className="head_text text-left">
        <span className="blue_gradient">
          {name}'s Profile
        </span>
      </h1>
      <p className="mt-7 desc text-left text-gray-900">
        {desc}
      </p>
      <div className='mt-10 prompt_layout'>
        {isDataAvailable ? data?.map((post) => {
          return (
          <PromtCard
            key={post._id}
            post={post}
            handleEdit={() => handleEdit && handleEdit(post)}
            handleDelete={() => handleDelete && handleDelete(post)}
          />
        )}) : (
          <div className="head_text">
            Your posts will be here
          </div>
        )}
      </div>
    </section>
  )
}

export default Profile