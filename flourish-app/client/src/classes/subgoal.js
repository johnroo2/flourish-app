export default class Subgoal{
    static count = 0;

    constructor(title="", date=null, iden_subgoal=0, finished=false){
        this.title = title;
        this.finished = finished;
        this.date = date;

        this.iden_subgoal = iden_subgoal; 
    }

    static getComparator(method){
        if(method === "date-ascending"){
            return function(g1, g2){return (new Date(...g1.date).getTime())-(new Date(...g2.date).getTime());}
        }
        else if(method === "date-descending"){
            return function(g1, g2){return (new Date(...g2.date).getTime())-(new Date(...g1.date).getTime());}
        }
        else if(method === "name-ascending"){
            return function(g1, g2){return g1.title.compareTo(g2.title);}
        }
        else if(method === "name-descending"){
            return function(g1, g2){return g2.title.compareTo(g1.title);}
        }
        else if(method === "iden-ascending"){
            return function(g1, g2){return g1.iden_subgoal-g2.iden_subgoal;}
        }
        else if(method === "iden-descending"){
            return function(g1, g2){return g2.iden_subgoal-g1.iden_subgoal;}
        }
    }

    static getDifferentialString(subgoal){
        let getMonthShort = (mno) => {
            const date = new Date();
            date.setMonth(mno);      
            return date.toLocaleString('en-US', { month: 'short' });
        }

        let getHourShort = (hno, mno) => {
            mno = mno.toString().padStart(2, '0');
            if(hno % 12 === 0){return hno === 12 ? "12" + ":" + mno + " PM" : "12" + ":" + mno + " AM"}
            return hno <= 12 ? hno + ":" + mno + " AM" : (hno-12) + ":" + mno + " PM";
        }

        let projected = subgoal.date;
        let current = new Date(Date.now());

        let projected_tomorrow = new Date(projected[0], projected[1], projected[2]-1);
        let currentArray = [current.getFullYear(), current.getMonth(), current.getDate()]

        //if day is same: TODAY
        if(currentArray[2] === projected[2] && currentArray[1] === projected[1] &&
            currentArray[0] === projected[0]){
            return "Today @ " + getHourShort(projected[3], projected[4]);
        }
        //if tomorrow: tomorrow
        else if(currentArray[2] === projected_tomorrow.getDate() && 
            currentArray[1] === projected_tomorrow.getMonth() &&
            currentArray[0] === projected_tomorrow.getFullYear()){
            return "Tomorrow @ " + getHourShort(projected[3], projected[4]);;
        }
        //same year: month simplified day
        else if(currentArray[0] === projected[0]){
            return getMonthShort(projected[1]) + " " + projected[2] + " @ " + getHourShort(projected[3], projected[4]);
        }

        //different year: month year
        else{
            return getMonthShort(projected[1]) + " " + projected[0];
        }

    }

    static stringify(subgoal){
        return JSON.stringify({title:subgoal.title, finished:subgoal.finished, date:subgoal.date, 
        iden_subgoal:subgoal.iden_subgoal});
    }

    static reverseStringify(data){
        let parsedData = JSON.parse(data);
        return new Subgoal(parsedData.title, parsedData.date, parsedData.iden_subgoal, 
            parsedData.finished);
    }
}