export default class Subgoal{
    static count = 0;

    constructor(title="", order=0, date=null, iden_subgoal=0, finished=false){
        this.title = title;
        this.finished = finished;
        this.order = order;
        this.date = date;

        this.iden_subgoal = iden_subgoal; 
    }

    static getDifferentialString(subgoal){
        let getMonthShort = (mno) => {
            const date = new Date();
            date.setMonth(mno);      
            return date.toLocaleString('en-US', { month: 'short' });
        }

        let projected = subgoal.date;
        let current = new Date(Date.now());

        let projected_tomorrow = new Date(projected[0], projected[1], projected[2]-1);
        let currentArray = [current.getFullYear(), current.getMonth(), current.getDate()]

        //if day is same: TODAY
        if(currentArray[2] === projected[2] && currentArray[1] === projected[1] &&
            currentArray[0] === projected[0]){
            return "Today";
        }
        //if tomorrow: tomorrow
        else if(currentArray[2] === projected_tomorrow.getDate() && 
            currentArray[1] === projected_tomorrow.getMonth() &&
            currentArray[0] === projected_tomorrow.getFullYear()){
            return "Tomorrow";
        }
        //same year: month simplified day
        else if(currentArray[0] === projected[0]){
            return getMonthShort(projected[1]) + " " + projected[2];
        }

        //different year: month year
        else{
            return getMonthShort(projected[1]) + " " + projected[0];
        }

    }

    static stringify(subgoal){
        return JSON.stringify({title:subgoal.title, finished:subgoal.finished, date:subgoal.date, 
            order:subgoal.order,
        iden_subgoal:subgoal.iden_subgoal});
    }

    static reverseStringify(data){
        let parsedData = JSON.parse(data);
        return new Subgoal(parsedData.title, parsedData.order, parsedData.date, parsedData.iden_subgoal, 
            parsedData.finished);
    }
}