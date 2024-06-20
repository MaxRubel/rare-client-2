import React from 'react';
import PropTypes from 'prop-types';

const SearchBar = ({ setPostSearch, posts }) => {
  const handleChange = (e) => {
    const filteredPosts = [];

    posts.forEach((post) => {
      const titleSearch = post.title.toLowerCase().includes(e.target.value.toLowerCase());
      const categorySearch = post.category.label.toLowerCase().includes(e.target.value.toLowerCase());

      if (titleSearch || categorySearch) {
        filteredPosts.push(post);
      }
    });
    setPostSearch(filteredPosts);
  };

  return (
    <div id="searchBar">
      <input
        placeholder="Search Posts"
        className="form-control"
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
      category: PropTypes.string,
    }),
  ).isRequired,
  setPostSearch: PropTypes.func.isRequired,
};

export default SearchBar;
