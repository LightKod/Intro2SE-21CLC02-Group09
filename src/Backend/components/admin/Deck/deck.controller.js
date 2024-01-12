const service = require("./deck.service");
exports.DeckPage = async (req, res, next) => {
    const styles = [
        "/admin/vendor/datatables/dataTables.bootstrap4.min.css",
        "/adminExtra/styles/card-list.css",
      ];
      const scripts = [
        "/admin/js/datatables/table-card.js",
        "/admin/vendor/datatables/jquery.dataTables.min.js",
        "/admin/vendor/datatables/dataTables.bootstrap4.min.js",
        "/adminExtra/scripts/set-list.js",
      ];
      const decks = await service.GetAllDecks();
      console.log(decks);
      res.render("admin/set", {
        layout: "admin/layouts/layout",
        title: "Sets",
        scripts: scripts,
        styles: styles,
        decks: decks,
        currentUser: req.user,
      });
}