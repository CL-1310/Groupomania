const Post = require('../models/Post');

exports.createPost = (req, res, next) => {
  console.log(req.body);
  const postObject = JSON.parse(req.body.post)
  const post = new Post({
    userId: postObject.userId,
    name: postObject.name,
    description: postObject.description,
    imageUrl: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`,
    likes : 0,
    dislikes : 0,
    usersLiked : [],
    usersDisliked : [],
  });

  post.save().then(
    () => {
      res.status(201).json({
        message: 'Post sauvegardé avec succès'
      });
    }
  ).catch(
    (error) => {
      res.status(400).json({ error: error });
    }
  );
};

exports.getOnePost = (req, res, next) => {
    Post.findOne({
      _id: req.params.id
    }).then(
      (post) => {
        res.status(200).json(post);
      }
    ).catch(
      (error) => {
        res.status(404).json({ error: error });
      }
    );
  };
  
  exports.modifyPost = (req, res, next) => {
    const postObject = req.file ?
    {
      ...JSON.parse(req.body.post),
      imageUrl: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`,
    }: {...req.body}
    Post.updateOne({_id: req.params.id}, postObject).then(
      () => {
        res.status(201).json({
          message: 'Post modifié avec succès'
        });
      }
    ).catch(
      (error) => {
        res.status(400).json({ error: error });
      }
    );
  };
  
  exports.deletePost = (req, res, next) => {
    Post.deleteOne({_id: req.params.id}).then(
      () => {
        res.status(200).json({
          message: 'Post supprimé avec succès'
        });
      }
    ).catch(
      (error) => {
        res.status(400).json({ error: error });
      }
    );
  };
  
  exports.getAllPost = (req, res, next) => {
    Post.find().then(
      (posts) => {
        res.status(200).json(posts);
      }
    ).catch(
      (error) => {
        res.status(400).json({ error: error });
      }
    );
  };

  exports.likes = (req, res, next) => {
    Post.findOne({
      _id: req.params.id
    }).then((post) => {
        if(req.body.like === 1){
          post.usersLiked.push(req.body.userId)
        }else if(req.body.like === -1){
          post.usersDisliked.push(req.body.userId)
        }else if(req.body.like === 0){
          if(post.usersLiked.includes(req.body.userId)){
            let likedIndex = post.usersLiked.indexOf(req.body.userId)
            post.usersLiked.splice(likedIndex)
          }
          if(post.usersDisliked.includes(req.body.userId)){
            let dislikedIndex = post.usersDisliked.indexOf(req.body.userId)
            post.usersDisliked.splice(dislikedIndex)
          }
        }
        post.likes = post.usersLiked.length

        post.dislikes = post.usersDisliked.length

        post.save()
        .then((post) => res.status(200).json({ message: "Mise à jour des likes et des dislikes"}))
        .catch((error) => res.status(400).json(error))
      }
    ).catch(
      (error) => {
        res.status(404).json({ error: error });
      }
    );
  }