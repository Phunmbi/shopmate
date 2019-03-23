import React, {Component, Fragment} from 'react';
import './HomeCatalogueFilter.scss';

export class HomeCatalogueFilter extends Component {
  render() {
    return (
			<Fragment>
				<div className="filter-main">
					<div className="filter-main__container">
						<div className="filter-main__results">
							<h2>Filter 486 items</h2>
							<div className="filter-main__filters">
								<p>x</p>
								<h3>Department:</h3>
								<h2>All</h2>
							</div>
							<div className="filter-main__filters">
								<p>x</p>
								<h3>Category:</h3>
								<h2>All</h2>
							</div>
						</div>
						<div className="filter-main__selection">
							<div className="filter-main__department">
								<h3>Department</h3>
								<div className="filter-main__form__wrapper">
									<form className="filter-main__form">
										<div>
											<input type="radio" id="women" name="department" value="Women" />
											<label htmlFor="Women">Women</label>
										</div>
										<div>
											<input type="radio" id="men" name="department" value="Men" />
											<label htmlFor="Men">Men</label>
										</div>
										<div>
											<input type="radio" id="kids" name="department" value="Kids" />
											<label htmlFor="Kids">Kids</label>
										</div>
										<div>
											<input type="radio" id="men" name="department" value="Men" />
											<label htmlFor="Men">Men</label>
										</div>
										<div>
											<input type="radio" id="kids" name="department" value="Kids" />
											<label htmlFor="Kids">Kids</label>
										</div>
									</form>
								</div>
							</div>
							<div className="filter-main__category">
								<h3>Category</h3>
								<div className="filter-main__form__wrapper">
									<form className="filter-main__form">
										<div>
											<input
												type="radio"
												name="category"
												id="accessories"
												value="accessories"
											/>
											<label htmlFor="Accessories">Accessories</label>
										</div>
										<div>
											<input type="radio" name="category" id="shoes" value="shoes" />
											<label htmlFor="Shoes">Shoes</label>
										</div>
										<div>
											<input type="radio" name="category" id="shirts" value="shirts" />
											<label htmlFor="Shirts">Shirts</label>
										</div>
										<div>
											<input type="radio" name="category" id="trousers" value="trousers" />
											<label htmlFor="Trousers">Trousers</label>
										</div>
										<div>
											<input type="radio" name="category" id="polo" value="polo" />
											<label htmlFor="Polo">Polo Shirts</label>
										</div>
										<div>
											<input type="radio" name="category" id="jackets" value="jackets" />
											<label htmlFor="Jackets">Jackets</label>
										</div>
									</form>
								</div>
							</div>
						</div>
						<div className="filter-main__action">
							<button>Apply</button>
							<p>x Clear All</p>
						</div>
					</div>
				</div>
			</Fragment>
		);
  }
}

export default HomeCatalogueFilter;
