import PropTypes from 'prop-types'
import style from "./filter.module.css";

const Filter = ({ filter, onChange }) => {
    return (
        <div className={style.container}>
            <label className={style.label}>
                Find contacts by name
            </label>
            <input
                value={filter}
                type="text"
                name="name"
                className={style.input}
                onChange={onChange}
                placeholder="Enter a name to search"
                pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
                required
            />
        </div>
    )

}

Filter.propTypes = {
    filter: PropTypes.string,
    onChange: PropTypes.func.isRequired,
}

export default Filter;