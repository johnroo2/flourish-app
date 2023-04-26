export default class Subgoal{
    static count = 0;

    constructor(title="", order=0, iden_subgoal=0, finished=false){
        this.title = title;
        this.finished = finished;
        this.order = order;

        this.iden_subgoal = iden_subgoal; 
    }

    static stringify(subgoal){
        return JSON.stringify({title:subgoal.title, finished:subgoal.finished, order:subgoal.order,
        iden_subgoal:subgoal.iden_subgoal});
    }

    static reverseStringify(data){
        let parsedData = JSON.parse(data);
        return new Subgoal(parsedData.title, parsedData.order, parsedData.iden_subgoal, 
            parsedData.finished);
    }
}