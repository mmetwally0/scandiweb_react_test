import React from "react";

import { ALL_CATEGORIES } from "../queries";
import { Query } from "@apollo/client/react/components";

class Categories extends React.Component {
  render() {
    return (
      <Query query={ALL_CATEGORIES}>
        {({ loading, data }) => {
          // Wait until data is fetched before rendering anything
          if (loading) return null;

          return (
            <ul className="category-links">
              {data.categories.map((category) => (
                <li
                  key={category.name}
                  onClick={() => {
                    this.props.handleCategoryChange(category.name);
                  }}
                  className={
                    this.props.category === category.name ? "active" : null
                  }
                >
                  {category.name}
                </li>
              ))}
            </ul>
          );
        }}
      </Query>
    );
  }
}

export default Categories;
