import React from 'react';
import PropTypes from 'prop-types';

const SearchBar = ({ setPostSearch, posts }) => {
  const handleChange = (e) => {
    const filteredPosts = [];

    posts.forEach((post) => {
      if (post.title.toLowerCase().includes(e.target.value.toLowerCase())) {
        filteredPosts.push(post);
      }
      // if (review.rating === e.target.value) {
      //   filteredSpirits.push(review);
      // }
    });
    setPostSearch(filteredPosts);
  };

  return (
    <div id="searchBar">
      <input
        placeholder="Search Posts"
        onChange={handleChange}
      />
    </div>
  );
};

SearchBar.propTypes = {
  posts: PropTypes.arrayOf(
    PropTypes.shape({
      image: PropTypes.string,
      title: PropTypes.string,
      publicationDate: PropTypes.string,
    }),
  ).isRequired,
  setPostSearch: PropTypes.func.isRequired,
};

export default SearchBar;
