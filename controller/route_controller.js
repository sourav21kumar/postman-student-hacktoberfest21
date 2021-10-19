const Contestants = require('../model/contestants')
const {nanoid} = require('nanoid')






module.exports.api_get_show_contestants = async (req, res) => {

    try {

        const listOfContestants = await Contestants.find()

        console.log(listOfContestants)

        res.status(200).json(listOfContestants)

    } catch (err) {
        console.log(err);
        res.status(400).send({ err });
    }
}


module.exports.api_get_getAContestat = async (req, res) => {

    const contestant_id = req.params.id
    // console.log(contestant_id.id)
    try {

        const contestantInfo = await Contestants.findById({ _id: contestant_id })

        if (contestantInfo) {

            res.status(200).send({
                id: contestantInfo._id,
                name: contestantInfo.name,
                costumeTitle: contestantInfo.costumeTitle,
                costumeImgUrl: contestantInfo.costumeImgUrl,
                city: contestantInfo.city,
                country: contestantInfo.country,
                votes: contestantInfo.votes
            })

        }
        else {
            res.status(404).send({ status: 'error', message: 'Contestant not found' })
        }
    } catch (err) {
        console.log(err)
        res.status(404).send({ err })
    }
}



module.exports.api_post_add_contestants = async (req, res) => {

    const requestData = req.body
    console.log(requestData.name)
    try {
        const stored_data = await Contestants.create({

            id:nanoid(),
            name: requestData.name,
            costumeTitle: requestData.costumeTitle,
            costumeImgUrl: requestData.costumeImgUrl,
            city: requestData.city,
            country: requestData.country,
            votes: requestData.votes

        })

        console.log(stored_data + 'from database')
        res.status(201).json({ status: 'ok', id: stored_data._id })

    } catch (err) {
        console.log(err)
        res.status(400).send({ err })
    }


}


module.exports.patch_updateContestant = async (req, res) => {

    const contestantId = req.params.id
    console.log(contestantId)

    try {
        const updatedContestantInfo = await Contestants.findByIdAndUpdate(contestantId, req.body, {
            new: true,
        })

        if (updatedContestantInfo) {

            res.status(200).send({ status: 'ok', info: updatedContestantInfo })
        }
        else {
            res.status(404).send({ message: 'Contestant not found' })
        }

    } catch (err) {
        console.log(err);
        res.status(400).send({ err })
    }


}


module.exports.api_contestantUpvote = async (req, res) => {

    const contestant_ID = req.params.id
    console.log(contestant_ID)

    try {
        const contestant_info = await Contestants.findById({ _id: contestant_ID })
        if (contestant_info) {

            console.log(contestant_info)
            let currentVotes = contestant_info.votes
            currentVotes = currentVotes + 1;
            console.log(currentVotes)

            const updatedContestantVotes = await Contestants.findByIdAndUpdate(contestant_ID, { votes: `${currentVotes}` }, {
                new: true,
            })
            res.status(200).send({ status: "ok", votes: currentVotes })
        }
        else {
            res.status(404).send({ message: 'Contestant not found' })
        }


    } catch (err) {
        console.log(err)
        res.status(400).send({ err })
    }
}

module.exports.api_deleteContestant = async (req, res) => {

    const id = req.params.id
    console.log(id)


    try {
        const deletedContestant = await Contestants.findByIdAndDelete({ _id: id })
        if (deletedContestant) {
            console.log(deletedContestant)
            res.status(200).send({ status: 'ok', contestant_id: id, itemDeleted: deletedContestant })

        }
        else {
            res.status(404).json({ message: 'Contestant not found' })
        }

    } catch (err) {
        console.log(err)
        res.status(404).json({ err })
    }

}