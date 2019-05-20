export const getInsights = (items) => {
    result = [];
    // items.forEach(batch => {
    //     const crystallographyCheck = doCrystallographyCheck(batch);
    //     if (crystallographyCheck) {
    //         result.push(crystallographyCheck);
    //     }
    // });
    const crystallographyCheck = doCrystallographyCheck();
    if (crystallographyCheck) {
        result.push(crystallographyCheck);
    }
    const timingCheck = doTimingCheck();
    if (timingCheck) {
        result.push(timingCheck);
    }

    return result;
};

doCrystallographyCheck = (batch) => {
    // const { departments } = batch;
    // departments.forEach(department => {
    //     const crystallography = department.data.find(item => item.name === 'Crystallography');
    //     data = departments.filter(dp => dp.name != department.name).forEach(departmentToCompare => {
    //         console.log(departmentToCompare);
    //         const cg = departmentToCompare.data.find(item => item.name === 'Crystallography');
    //         if (cg && !arraysEqual(cg, crystallography)) {
    //             return {
    //                 name: 'The Chemistry of Batch #' + batch.id + ' has changed between ' + department.name + ' and ' + departmentToCompare.name, type: 'error'
    //             };
    //         }

    //     });
    // });

    return { name: 'The Chemistry of Batch #22 has changed between Mining and Plant', type: 'error' };
}

doTimingCheck = (batch) => {
    return { name: 'Batch #24 shipped 1 day longer than was expected', type: 'warning' }
}

function arraysEqual(arr1, arr2) {
    if (arr1.length !== arr2.length)
        return false;
    for (var i = arr1.length; i--;) {
        if (arr1[i] !== arr2[i])
            return false;
    }

    return true;
}