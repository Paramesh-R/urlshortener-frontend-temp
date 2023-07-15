import React from 'react'
import Pagination from 'react-bootstrap/Pagination';
// import { returnPaginationPage } from "../utils/appUtils"
import _ from 'lodash'

const returnPaginationPage = (totalPage, page, limit, siblings) => {
  let totalPageNoInArray = 7 + siblings;

  // If Total Pages are less than 7 
  if (totalPageNoInArray >= totalPage) {
    return _.range(1, totalPage + 1);
  }

  let leftSiblingsIndex = Math.max(page - siblings, 1);
  let rightSiblingsIndex = Math.min(page + siblings, totalPage)

  let showLeftDots = leftSiblingsIndex > 2;
  let showRightDots = rightSiblingsIndex < totalPage - 2;

  if (!showLeftDots && showRightDots) {
    let leftItemsCount = 3 + 2 * siblings;
    let leftRange = _.range(1, leftItemsCount + 1);
    return [...leftRange, " ...", totalPage];
  } else if (showLeftDots && !showRightDots) {
    let rightItemsCount = 3 + 2 * siblings;
    let rightRange = _.range(totalPage - rightItemsCount + 1, totalPage + 1);
    return [1, "... ", ...rightRange];
  } else {
    let middleRange = _.range(leftSiblingsIndex, rightSiblingsIndex + 1);
    return [1, "... ", ...middleRange, " ...", totalPage]
  }
}

function PaginationComp(props) {

  let array = returnPaginationPage(
    props.totalPage,
    props.page,
    props.limit,
    props.sibling
  )
  return (
    <>

      <Pagination>
        <Pagination.First onClick={() => { props.onPageChange("&laquo;") }} />
        <Pagination.Prev onClick={() => { props.onPageChange("&lsaquo;") }} />
        {array.map(value => {
          if (value === props.page) {
            /* { console.log("Active" + props.page) } */
            // return <Pagination.Item key={value} active={true}/* className="active" */>{value}</Pagination.Item>
            return (
              <Pagination.Item
                key={value}
                active={true}
              >
                {value}
              </Pagination.Item>
            )
          } else {
            return (
              <Pagination.Item
                key={value}
                onClick={() => { props.onPageChange(value) }}
              >
                {value}
              </Pagination.Item>
            )
          }
        })}
        <Pagination.Next onClick={() => { props.onPageChange("&rsaquo;") }} />
        <Pagination.Last onClick={() => { props.onPageChange("&raquo;") }} />
      </Pagination>
    </>
  )
}

export default PaginationComp